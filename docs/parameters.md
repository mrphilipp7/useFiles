# Parameters
Remember how I said that we use '{}' when we initialize our hook? Well we do that for some of the great parameters we can use to customize our manager.

## allowedExtensions
Sometimes, maybe for a security feature, we only want to let users upload certain files. We can do that with allowedExtensions. 

This parameter accepts an array of strings denoting the file type(s) allowed.

### example
```typescript
import { useFiles } from 'usefiles';

function RouteComponent() {
  const { addFile } = useFiles({
    allowedExtensions: ['.txt', '.doc'],
  });

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
      <input
        type="file"
        accept=".txt,.doc"
        onChange={handleFileChange}
      />
    </div>
  );
}

``` 

## allowedMimeTypes
Sometimes, file extensions aren’t enough. For stronger validation, you may want to restrict uploads based on the file’s MIME type.
You can do this using the allowedMimeTypes option.

This parameter accepts an array of MIME type strings (for example, image/png, application/pdf). Files whose MIME type is not included will be rejected.

### example
```typescript
import { useFiles } from 'usefiles'

function RouteComponent() {
  const { addFile } = useFiles({
    allowedMimeTypes: ['text/plain', 'application/msword'],
  })

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
      <input
        type="file"
        accept="text/plain,application/msword"
        onChange={handleFileChange}
      />
    </div>
  )
}
```

## maxFileSize
Sometimes you may want to prevent users from uploading files that are too large.
You can enforce a maximum file size using the maxFileSize option.

This parameter accepts a number in bytes. Any file larger than this value will be rejected.

### example
```typescript
import { useFiles } from 'usefiles'

function RouteComponent() {
  const { addFile } = useFiles({
    maxFileSize: 5 * 1024 * 1024, // 5 MB
  })

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
      <input
        type="file"
        onChange={handleFileChange}
      />
    </div>
  )
}

```

## maxFiles
Sometimes you may want to limit how many files a user can add in total.
You can enforce a maximum file count using the maxFiles option.

This parameter accepts a number representing the maximum number of files allowed.
### example
```typescript
import { useFiles } from 'usefiles'

function RouteComponent() {
  const { addFile } = useFiles({
    maxFiles: 3,
  })

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
      <input
        type="file"
        onChange={handleFileChange}
      />
    </div>
  )
}

```

## allowDuplicates
Sometimes you may want to allow or prevent duplicate files from being added.
By default, useFiles rejects duplicates, but you can override this behavior using the allowDuplicates option.

This parameter accepts a boolean:

true → allows the same file to be added multiple times

false → rejects duplicates based on file name and file size (default)

### example
```typescript
import { useFiles } from 'usefiles'

function RouteComponent() {
  const { addFile } = useFiles({
    allowDuplicates: true, // allow the same file multiple times
  })

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
      <input
        type="file"
        onChange={handleFileChange}
      />
    </div>
  )
}

```

#### Notes
- Duplicates are determined by comparing both the file name and size.

- Setting allowDuplicates: true can be useful if:

    - Users may need multiple copies of the same file

    - Your backend handles files uniquely (e.g., by ID or timestamp)

- Setting allowDuplicates: false is safer for most applications, preventing accidental double uploads.

## Combined example
You can use allowDuplicates along with maxFiles and allowedExtensions for layered validation:
```typescript
useFiles({
  maxFiles: 5,
  allowedExtensions: ['.txt', '.doc'],
  allowDuplicates: false,
})
```
This ensures users can only add valid, unique files up to the limit.