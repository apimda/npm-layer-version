import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { describe, expect, test } from 'vitest';
import { NpmLayerVersion } from './npm-layer-version.js';

const testLayerPath = 'test-layer';

describe('NpmLayer', () => {
  test('rejects multi-arch layers', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'ApimdaStack');
    const lvProps = {
      compatibleArchitectures: [lambda.Architecture.ARM_64, lambda.Architecture.X86_64],
      compatibleRuntimes: [lambda.Runtime.NODEJS_18_X]
    };
    let err = undefined;
    try {
      new NpmLayerVersion(stack, 'NpmLayer', {
        layerPath: testLayerPath,
        layerVersionProps: lvProps
      });
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
  });

  test('creates correct lambda layer', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'ApimdaStack');
    const lvProps = {
      removalPolicy: RemovalPolicy.DESTROY,
      compatibleArchitectures: [lambda.Architecture.ARM_64],
      compatibleRuntimes: [lambda.Runtime.NODEJS_18_X],
      description: 'sample description'
    };
    const layer = new NpmLayerVersion(stack, 'NpmLayer', {
      layerPath: testLayerPath,
      layerVersionProps: lvProps
    });
    expect(layer.packagedDependencies.sort()).toStrictEqual(
      ['@aws-sdk/client-dynamodb', '@aws-sdk/lib-dynamodb'].sort()
    );

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Lambda::LayerVersion', 1);
    template.hasResourceProperties('AWS::Lambda::LayerVersion', {
      CompatibleArchitectures: ['arm64'],
      CompatibleRuntimes: ['nodejs18.x'],
      Description: 'sample description'
    });
  });
});
