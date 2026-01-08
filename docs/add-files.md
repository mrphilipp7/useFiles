# Add files
One of the core features of useFiles is the ability to add files to your list — whether single, multiple, or even replacing existing files.

## Add a single file
You can use the hook to add a single file. The addFile function returns an object with added and rejected information, allowing you to handle validation errors gracefully.

### example
```typescript
import { useFiles } from 'usefiles'

function SingleFileUpload() {
  const { addFile } = useFiles({})

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const result = addFile(file)

    if (result.rejected.length > 0) {
      result.rejected.forEach(({ file, error }) => {
        console.error(`File "${file.name}" was rejected: ${error}`)
      })
    }

    if (result.added > 0) {
      console.log(`Successfully added ${result.added} file(s)`)
    }

    // Allow re-selecting the same file
    event.target.value = ''
  }

  return (
    <div>
      <p>Add a single file.</p>
      <input type="file" onChange={handleFileChange} />
    </div>
  )
}
``` 
#### Notes:
- Always check result.rejected to handle validation errors.
- Resetting event.target.value ensures the same file can be re-selected.

## Add multiple files
Adding multiple files at once works similarly using the addFiles function. Each file will be validated individually.

### example
```typescript
import { useFiles } from 'usefiles'

function MultipleFileUpload() {
  const { addFiles } = useFiles({})

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const result = addFiles(files)

    result.rejected.forEach(({ file, error }) => {
      console.error(`File "${file.name}" was rejected: ${error}`)
    })

    if (result.added > 0) {
      console.log(`Successfully added ${result.added} file(s)`)
    }

    // Allow re-selecting the same files
    event.target.value = ''
  }

  return (
    <div>
      <p>Add multiple files.</p>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  )
}

``` 
#### Notes:
- addFiles returns the same shape as addFile with added and rejected.
- The multiple attribute on the input enables selecting more than one file at a time.

## Replace a file 
If you need to replace an existing file, replaceFile allows you to swap it out by file ID.

### example
```typescript
import { useFiles } from 'usefiles'

function ReplaceFileUpload() {
  const { replaceFile } = useFiles({})

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Replace a file by its unique ID
    const fileId = 'your-file-id-here'
    const result = replaceFile(fileId, file)

    if (result.rejected.length > 0) {
      result.rejected.forEach(({ file, error }) => {
        console.error(`File "${file.name}" was rejected: ${error}`)
      })
    }

    if (result.added > 0) {
      console.log(`File "${file.name}" was replaced successfully.`)
    }

    // Allow re-selecting the same file
    event.target.value = ''
  }

  return (
    <div>
      <p>Replace an existing file.</p>
      <input type="file" onChange={handleFileChange} />
    </div>
  )
}

```
#### Notes:
- Each file managed by useFiles has a unique ID.
- IDs make replacing, finding, or managing duplicate files straightforward.
- Always check result.rejected to handle failed replacements.
