# NpmLayerVersion

`NpmLayerVersion` is a CDK construct to create a custom [lambda layer](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html) from an NPM package.json file.

## Usage

Add the packages to be included in a `package.json`, and the construct will make sure they're up-to-date before every deployment (i.e. `npm install`), and generate the [LayerVersion](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.LayerVersion.html) to use in your CDK stacks.

### Directory Structure

`NpmLayerVersion` requires the following directory structure, as specified by [AWS Lambda layer path configuration](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html#configuration-layers-path)

```
<root>
|- <custom code>
|- nodejs
   |- package.json
   |- package-lock.json
```

### Creating an NpmLayerVersion

You can create an `NpmLayerVersion` with the following `NpmLayerVersionProps`:

1. Path to the directory structure of the layer, relative to your `tsconfig.json`
2. Custom [LayerVersionProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.LayerVersionProps.html) to pass to the underlying CDK `LayerVersion` construct:

```typescript
const layer = new NpmLayerVersion(this, 'DependencyLayer', {
  layerPath: 'src/deploy/layer',
  layerVersionProps: {
    removalPolicy: UserApiStack.removalPolicy,
    compatibleArchitectures: [lambda.Architecture.X86_64, lambda.Architecture.ARM_64],
    compatibleRuntimes: [lambda.Runtime.NODEJS_16_X]
  }
});
```

### Using with NodejsFunction

`NpmLayerVersion` provides two properties to be used when creating `NodejsFunction`s:

1. `layerVersion`: the underlying CDK `LayerVersion` representing the lambda layer itself
2. `packagedDependencies`: list of dependencies that were packaged.

The example below shows how to use this with [NodejsFunctionProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_nodejs.NodejsFunctionProps.html):

```typescript
const lambdaProps: NodejsFunctionProps = {
  architecture: lambda.Architecture.ARM_64,
  runtime: lambda.Runtime.NODEJS_16_X,
  bundling: {
    minify: false,
    target: 'node16',
    externalModules: layer.packagedDependencies // don't bundle layer dependencies in lambda
  },
  layers: [layer.layerVersion] // use lambda layer
};
```

## Contributing

We're happy to accept contributions! Please open an issue before sending a PR to discuss proposed changes.
