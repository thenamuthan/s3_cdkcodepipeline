import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import  * as pipeline from 'aws-cdk-lib/aws-codepipeline';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import * as secrets from 'aws-cdk-lib/aws-secretsmanager';
import { PipelineAppStage } from '../lib/demoawspipeline-stacks';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { Bucket } from 'aws-cdk-lib/aws-s3';



export class s3CdkcodepipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // creating cicd pipeline
    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('SynthStep', {
        input: CodePipelineSource.gitHub('thenamuthan/cdkcodepipline', 'main'),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
        
      }),
    });

    // creating test stage
    const testStage = pipeline.addStage(new PipelineAppStage(this, 'TestStage', {
      env: { account: '905418016855', region: 'us-west-1' },
      stageName: 'Test',
    }));

    testStage.addPost(new ManualApprovalStep('ManualApproval'));

    const prodstage = pipeline.addStage( new PipelineAppStage(this, 'prodstage', {
      env: { account: '905418016855', region: 'us-west-1' },
      stageName: 'prod',
    }));
    
  }
}