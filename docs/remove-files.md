# Remove files
useFiles allows you to remove individual files or clear all files from the current list. These two operations make file management straightforward and predictable.

## Remove a single file
The removeFile function removes a file by its unique ID.

### example
```typescript
import { useFiles } from 'usefiles'

function RemoveSingleFile() {
  const { files, removeFile } = useFiles({})

  const handleRemove = (fileId: string) => {
    removeFile(fileId)
    console.log(`File with ID ${fileId} removed.`)
  }

  return (
    <div>
      <h3>Current Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.file.name}{' '}
            <button
              onClick={() => handleRemove(file.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```
#### Notes:
- Each file added via useFiles has a unique ID.
- Removing files by ID ensures that even duplicates can be targeted individually.
- The files array updates automatically after a removal.

## Remove all files
The reset function clears the entire list of files at once.

### example
```typescript
import { useFiles } from 'usefiles'

function ClearAllFiles() {
  const { files, reset } = useFiles({})

  return (
    <div>
      <h3>All Files</h3>
      <button
        onClick={reset}
      >
        Clear All Files
      </button>
      <ul>
        {files.map((file) => (
          <li key={file.id}>{file.file.name}</li>
        ))}
      </ul>
    </div>
  )
}

```
