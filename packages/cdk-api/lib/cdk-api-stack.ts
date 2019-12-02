import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');

const S3_BUCKET_NAME = 'remote-dictionary-api-cdk'

export class CdkApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new s3.Bucket(this, S3_BUCKET_NAME, {
      versioned: false
    })
  }
}
