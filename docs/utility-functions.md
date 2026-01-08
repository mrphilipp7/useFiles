# Utility Functions
In addition to adding, removing, and finding files, useFiles provides several utility functions and derived values to make file management even easier.

## totalSize
Calculates the combined size of all files in bytes.

### example
```typescript
import { useFiles } from 'usefiles'

function TotalSizeExample() {
  const { files, totalSize } = useFiles({})

  return (
    <div>
      <p>Total files: {files.length}</p>
      <p>Total size: {totalSize} bytes</p>
    </div>
  )
}

```
#### Notes:
- Automatically updates as files are added or removed.
- Useful for validating total upload size limits or showing progress.

## fileCount and hasFiles
- fileCount: Number of files currently in the hook.
- hasFiles: Boolean indicating if there are any files at all.

### example
```typescript
import { useFiles } from 'usefiles'

function FileCountExample() {
  const { fileCount, hasFiles } = useFiles({})

  return (
    <div>
      <p>Files present? {hasFiles ? 'Yes' : 'No'}</p>
      <p>Total number of files: {fileCount}</p>
    </div>
  )
}
```

## canAddMore()
Returns true if more files can be added without exceeding the maxFiles limit.

### example
```typescript
import { useFiles } from 'usefiles'

function CanAddMoreExample() {
  const { files, canAddMore } = useFiles({ maxFiles: 5 })

  return (
    <div>
      <p>Can add more files? {canAddMore() ? 'Yes' : 'No'}</p>
      <p>Current file count: {files.length}</p>
    </div>
  )
}
```

## remainingSlots()
Returns the number of additional files that can be added before reaching the maxFiles limit. Returns Infinity if no max limit is set.

### example
```typescript
import { useFiles } from 'usefiles'

function RemainingSlotsExample() {
  const { remainingSlots } = useFiles({ maxFiles: 10 })

  return (
    <div>
      <p>Remaining slots: {remainingSlots()}</p>
    </div>
  )
}
```

## userFileMeta(fileId, meta)
Updates the metadata of a file. This is useful if you want to attach custom data to a file, such as a description, tags, or temporary status.

### example
```typescript
import { useFiles } from 'usefiles'

function UpdateMetaExample() {
  const { files, updateFileMeta } = useFiles({})

  const handleAddDescription = (fileId: string) => {
    updateFileMeta(fileId, { description: 'This is a test file' })
  }

  return (
    <div>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.file.name}
            <button onClick={() => handleAddDescription(file.id)}>
              Add description
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```
#### Notes:
- Metadata is stored alongside the file object inside the hook.
- Can store any type of information (TMeta) you need for your app.

## Summary

| Utility | Type | Description |
| ----------- | ----------- | ----------- | 
| totalSize | number | Total size in bytes of all files. 
| fileCount | number | Number of files in the hook.
| hasFiles | boolean | True if there is at least one file.
| canAddMore() | () => boolean | Whether more files can be added without exceeding maxFiles.
| remainingSlots() | () => number | How many more files can be added (or Infinity if unlimited).
| updateFileMeta(fileId, meta) | (fileId: string, meta: TMeta) => void | Update custom metadata for a file.


