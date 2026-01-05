# useFiles
A headless React hook for managing files with validation, duplicates, and metadata.


## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Quick Example](#quick-example)
- [useFiles API](#usefiles-api)

## Features
useFiles is meant to be a simple hook that exposes a bunch of utility functions that makes dealing with files a lot simpler. 
## Installation
**Package manager**
**npm:**

```bash
$ npm install usefiles
```

**yarn:**

```bash
$ npm add usefiles
```
**pnpm:**

```bash
$ npm add usefiles
```
**bun:**

```bash
$ npm add usefiles
```
## Quick example
Since all of the utility of useFiles is handled inside of the hook. You have no need to create state variables because useFiles tracks one for you!
```typescript
import { useFiles } from "usefiles";
import PageContainer from "@/components/page-container";

function  RouteComponent() {
	const files = useFiles({});
	
	return (
		<PageContainer>
			<p>test</p>
		</PageContainer>
	);
}
```
Now you could do something like this.
```typescript
import { useFiles } from  "usefiles";
import  PageContainer  from  "@/components/page-container";

function  RouteComponent() {
const { addFile, fileCount, findFileByName } = useFiles({});

const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
	const selectedFiles = event.target.files;
	if (selectedFiles) {
		// for simplicity, we only handle a single file upload here
		addFile(selectedFiles[0]);
	}
};

return (

	<PageContainer>
		<p>test</p>
		<input  type="file"  onChange={handleFileChange}  />
		{fileCount  >  0  && (
		<div>
			<h3>Uploaded Files</h3>
			<p>{findFileByName("example.png")?.file.name}</p>
		</div>
		)}
	</PageContainer>
	);
}
```
Notice how we did not need to create a state variable? That's because useFiles will track all your files for. 
You may also notice this 
```typescript
findFileByName("example.png")?.file.name
```
This is unique because useFiles doesn't just track an array of files. useFiles structures your file array in the type
```typescript
type FileItem<TMeta=unknown> = {
	id: string;
	file: File;
	meta?: TMeta;
};
```
Doing this allows for 

 - Better file tracking by using unique id's
 - Adding utility functions so the array
 - adding metadata in case it needs to be stored along with the file suck as ownership or content
 
  ## useFiles API
  useFiles only needs one line of code to really get going!
  ```typescript
  const files = useFiles({})
  ```
  However, the hook can handle some optional parameters to create better safety and organization.
  Here is the type of props useFiles accepts
  
 - allowedExtensions: An array of strings such as ['.png', '.txt'].
 - allowedMimeType: An array of strings such as ['text/html','image/jpeg']
 - maxFilesSize: A number that checks a files size when it is added. It is read in bytes eg. 1000000 which would be a 1 megabyte file  
 - maxFiles: A number that caps how many files can be added to the array. 
 - allowDuplicates: A boolean that is default set to false but can allow you to upload multiple instances of the same file.

  useFiles does more than tracks your files for you! It exports a ton of great utility functions that will make management easier. 
  ```typescript
return {
files, // tracked files
fileCount, // number of files
totalSize, // total size of all files in bytes
hasFiles: // boolean indicating if there are any files

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
```

I hope this package does a great job of making dealing with files just a little bit easier. 
