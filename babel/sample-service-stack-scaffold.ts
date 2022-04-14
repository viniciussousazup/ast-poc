// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';
import * as sns from '@aws-cdk/aws-sns';

export interface AStackProps extends cdk.StackProps {
  readonly bucketName: string; // Bucket to enable SQS notifications
}
//scaffold:
export class AStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: AStackProps) {
    super(scope, id, props);


    //scaffold:
    const lambdaArn = cdk.Arn.format({
      service: 'lambda',
      resource: 'S3EventNotificationsManager'
    }, this);
  }
}


