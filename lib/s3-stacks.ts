import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import *as s3 from 'aws-cdk-lib/aws-s3';

export class CdkpipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes her

    // upload the code in s3
    new cdk.aws_s3_deployment.BucketDeployment(this, "bucketdeploywest2region", {
      sources: [cdk.aws_s3_deployment.Source.asset("./build")],
      destinationBucket: new s3.Bucket(this, "code_deploy_bckt_west-2", {
        versioned: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        websiteIndexDocument: 'index.html',
        websiteErrorDocument: 'index.html',
        publicReadAccess: false,
        blockPublicAccess: {
          blockPublicAcls: false,
          blockPublicPolicy: false,
          ignorePublicAcls: false,
          restrictPublicBuckets: false
        }
      })
    })
  }
}
