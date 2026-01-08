# Minimal Example
Here is a very basic example of using useFiles

## Example
Here we are initializing the hook in our React component.

```typescript
import { useFiles } from "usefiles";

function  RouteComponent() {
	const files = useFiles({});
	
	return (
		<div>
			<p>This is our first route!</p>
		</div>
	);
}
```
Notice how when we initialize it we include '{}'. This is because useFiles accepts some parameters which really help the hook shine!