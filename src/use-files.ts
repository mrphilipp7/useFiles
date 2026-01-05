import React, { useMemo } from "react";

type FileItem<TMeta = unknown> = {
	id: string;
	file: File;
	meta?: TMeta;
};

type UseFilesProps = {
	allowedExtensions?: string[];
	allowedMimeTypes?: string[]; // text/html, image/jpeg
	maxFileSize?: number;
	maxFiles?: number;
	allowDuplicates?: boolean; // default: false
};


function useFiles({
	allowedExtensions = [],
	allowedMimeTypes = [],
	maxFileSize,
	maxFiles,
	allowDuplicates = false,
}: UseFilesProps) {
	const [files, setFiles] = React.useState<FileItem[]>([]);

	const addFile = (file: File) => addFiles([file]);

	const addFiles = (input: FileList | File[]) => {
		const filesArray = Array.from(input);

		const addedFiles: FileItem[] = [];
		const rejected: { file: File; error: string }[] = [];

		setFiles((prev) => {
			const nextFiles = [...prev];

			for (const file of filesArray) {
				const error = validateFile(file, nextFiles);

				if (error) {
					rejected.push({ file, error });
					continue;
				}

				const fileItem: FileItem = {
					id: crypto.randomUUID(),
					file,
				};

				nextFiles.push(fileItem);
				addedFiles.push(fileItem);
			}

			return nextFiles;
		});

		return {
			added: addedFiles.length,
			rejected,
		};
	};

	const removeFile = (fileId: string) => {
		setFiles((prev) => prev.filter((fileItem) => fileItem.id !== fileId));
	};

	const reset = () => {
		setFiles([]);
	};

	const findFileById = (fileId: string): FileItem | undefined => {
		return files.find((fileItem) => fileItem.id === fileId);
	};

	const findFileByName = (fileName: string): FileItem | undefined => {
		return files.find((fileItem) => fileItem.file.name === fileName);
	};

	const replaceFile = (fileId: string, newFile: File) => {
		setFiles((prev) =>
			prev.map((fileItem) =>
				fileItem.id === fileId ? { ...fileItem, file: newFile } : fileItem,
			),
		);
	};

	const updateFileMeta = <TMeta>(fileId: string, meta: TMeta) => {
		setFiles((prev) =>
			prev.map((fileItem) =>
				fileItem.id === fileId ? { ...fileItem, meta } : fileItem,
			),
		);
	};

	const findFilesByExtension = (extension: string): FileItem[] => {
		return files.filter((fileItem) =>
			fileItem.file.name.toLowerCase().endsWith(`.${extension.toLowerCase()}`),
		);
	};

	const findFilesByMimeType = (mimeType: string): FileItem[] => {
		return files.filter((fileItem) => fileItem.file.type === mimeType);
	};

	const validateFile = (
		file: File,
		existingFiles: FileItem[],
	): string | null => {
		const limitError = checkIfFileExceedsLimits(existingFiles.length);
		if (limitError) return limitError;

		const sizeError = checkIfFileExceedsSizeLimit(file);
		if (sizeError) return sizeError;

		const typeError = checkIfFileTypeIsAllowed(file);
		if (typeError) return typeError;

		const duplicateError = checkIfFileIsDuplicate(file, existingFiles);
		if (duplicateError) return duplicateError;

		return null;
	};

	const isMimeTypeAllowed = (
		fileMime: string,
		allowedMimeTypes: string[],
	): boolean => {
		return allowedMimeTypes.some((allowed) => {
			// Exact match
			if (!allowed.endsWith("/*")) {
				return fileMime === allowed;
			}

			// Group match (image/*)
			const group = allowed.replace("/*", "");
			return fileMime.startsWith(`${group}/`);
		});
	};

	const totalSize = files.reduce(
		(total, fileItem) => total + fileItem.file.size,
		0,
	);

	const fileCount = useMemo(() => files.length, [files]);

	const canAddMore = () => {
		if (maxFiles == null) return true;
		return files.length < maxFiles;
	};

	const remainingSlots = () => {
		if (maxFiles == null) return Infinity;
		return Math.max(0, maxFiles - files.length);
	};

	// util functions for checks
	function checkIfFileExceedsLimits(currentCount: number): string | null {
		if (maxFiles == null) return null;

		if (currentCount + 1 > maxFiles) {
			return "Exceeds the maximum number of files allowed";
		}

		return null;
	}

	function checkIfFileExceedsSizeLimit(file: File) {
		if (maxFileSize === undefined) return null;
		if (maxFileSize !== null && file.size > maxFileSize) {
			return "File size exceeds the maximum limit";
		}
		return null;
	}

	const checkIfFileTypeIsAllowed = (file: File): string | null => {
		// Extension check
		if (allowedExtensions?.length) {
			const extension = file.name.split(".").pop()?.toLowerCase();

			if (!extension || !allowedExtensions.includes(extension)) {
				return "File extension is not allowed";
			}
		}

		// MIME type check (with group support)
		if (allowedMimeTypes?.length) {
			if (!file.type) {
				return "Unable to determine file type";
			}

			if (!isMimeTypeAllowed(file.type, allowedMimeTypes)) {
				return "File MIME type is not allowed";
			}
		}

		return null;
	};

	function checkIfFileIsDuplicate(
		file: File,
		existingFiles: FileItem[],
	): string | null {
		if (allowDuplicates) return null;
		const isDuplicate = existingFiles.some(
			(existingFile) =>
				existingFile.file.name === file.name &&
				existingFile.file.size === file.size &&
				existingFile.file.lastModified === file.lastModified,
		);

		if (isDuplicate) {
			return "Duplicate file detected";
		}

		return null;
	}

	return {
		files, // tracked files
		fileCount, // number of files
		totalSize, // total size of all files in bytes
		hasFiles: fileCount > 0, // boolean indicating if there are any files

		addFile, // add a single file
		addFiles, // add multiple files
		replaceFile, // replace a file by id

		removeFile,
		reset, // remove all files

		findFileById, // find a file by id
		findFileByName, // find a file by name
		findFilesByExtension, // find files by extension
		findFilesByMimeType, // find files by mime type

		updateFileMeta, // update meta information of a file
		canAddMore, // check if more files can be added
		remainingSlots, // number of remaining file slots
	};
}

export { useFiles };
export type { FileItem, UseFilesProps };