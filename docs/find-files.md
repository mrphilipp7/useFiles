# Find Files
useFiles makes it easy to search through your file list with a set of utility functions. You can find files by name, extension, or MIME type, and even replace a file directly using its unique ID.

## Find a file by name
The findFileByName function returns a single file that matches the given filename exactly.

### example
```typescript
import { useFiles } from 'usefiles'

function FindFileByNameExample() {
  const { files, findFileByName } = useFiles({})

  const handleFind = (fileName: string) => {
    const fileItem = findFileByName(fileName)
    if (fileItem) {
      console.log(`Found file: ${fileItem.file.name}`)
    } else {
      console.log(`File "${fileName}" not found.`)
    }
  }

  return (
    <div>
      <button onClick={() => handleFind('example.txt')}>Find example.txt</button>
      <ul>
        {files.map((file) => (
          <li key={file.id}>{file.file.name}</li>
        ))}
      </ul>
    </div>
  )
}

```
#### Notes:
- Returns the first file that matches the name exactly.
- Useful when you know the exact filename.
- Returns undefined if no file matches.

## Find Files by Extension
The findFilesByExtension function filters files by their file extension (case-insensitive).

### example
```typescript
import { useFiles } from 'usefiles'

function FindFilesByExtensionExample() {
  const { files, findFilesByExtension } = useFiles({})

  const handleFind = (extension: string) => {
    const matchingFiles = findFilesByExtension(extension)
    console.log(`Found ${matchingFiles.length} file(s) with .${extension}:`)
    matchingFiles.forEach((file) => console.log(file.file.name))
  }

  return (
    <div>
      <button onClick={() => handleFind('txt')}>Find .txt files</button>
      <ul>
        {files.map((file) => (
          <li key={file.id}>{file.file.name}</li>
        ))}
      </ul>
    </div>
  )
}

```
#### Notes:
- Case-insensitive (.TXT and .txt both match).
- Returns an array of all files with the given extension.
- Useful for filtering by type when multiple files share the same extension.

## Find Files by MIME Type
The findFilesByMimeType function filters files by their MIME type (e.g., application/pdf, image/png).

### example
```typescript
import { useFiles } from 'usefiles'

function FindFilesByMimeTypeExample() {
  const { files, findFilesByMimeType } = useFiles({})

  const handleFind = (mimeType: string) => {
    const matchingFiles = findFilesByMimeType(mimeType)
    console.log(`Found ${matchingFiles.length} file(s) with MIME type "${mimeType}":`)
    matchingFiles.forEach((file) => console.log(file.file.name))
  }

  return (
    <div>
      <button onClick={() => handleFind('image/png')}>Find PNG images</button>
      <ul>
        {files.map((file) => (
          <li key={file.id}>{file.file.name}</li>
        ))}
      </ul>
    </div>
  )
}
```
#### Notes:
- Exact match on MIME type.
- Useful for file type validation or filtering in UI lists.

## Replace a File by ID
Sometimes you want to swap out an existing file while keeping its position in the array. Use replaceFile with the file’s unique ID.

### example
```typescript
import { useFiles } from 'usefiles'

function ReplaceFileExample() {
  const { files, replaceFile } = useFiles({})

  const handleReplace = (fileId: string, newFile: File) => {
    replaceFile(fileId, newFile)
    console.log(`File with ID ${fileId} has been replaced.`)
  }

  return (
    <div>
      <p>Files:</p>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.file.name}{' '}
            <input
              type="file"
              onChange={(e) => {
                const newFile = e.target.files?.[0]
                if (newFile) handleReplace(file.id, newFile)
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
```
#### Notes:
- replaceFile updates the file while keeping the ID and array order intact.
- Works even if there are duplicate files — IDs ensure correct targeting.