# useFiles
useFiles is meant to be a simple React hook that exposes a bunch of utility functions that makes dealing with files a lot simpler. 

## Installation
**Package manager**
**npm:**

```bash
$ npm install usefiles
```

**yarn:**

```bash
$ yarn add usefiles
```
**pnpm:**

```bash
$ pnpm add usefiles
```
**bun:**

```bash
$ bun add usefiles
```
## Quick example
Here is a basic example of using useFiles.

```typescript
import { useFiles } from 'usefiles'

function FileUploader() {
  const { addFile } = useFiles({ allowedExtensions: ['.txt'] })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    addFile(file)
    e.target.value = ''
  }

  return <input type="file" onChange={handleChange} />
}
```

## See the full docs
For full usage instructions, API reference, and guides, please visit the documentation:
[useFiles Documentation](https://mrphilipp7.github.io/usefiles/)
