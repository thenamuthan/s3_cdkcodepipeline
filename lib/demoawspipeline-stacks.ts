import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CdkpipelineStack } from '../lib/s3-stacks';

export class PipelineAppStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const demobucket = new CdkpipelineStack(this, 'CdkpipelineStack');
  }
}