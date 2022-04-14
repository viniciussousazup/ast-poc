// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as iam from '@aws-cdk/aws-iam';

function a (){
  console.log("abc")
}

export interface AStackProps extends cdk.StackProps {
  readonly bucketName: string; // Bucket to enable SQS notifications
}
//scaffold:
export class AStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: AStackProps) {
    super(scope, id, props);


  
    //plugin: sqs
    const queue = new sqs.Queue(this, 'SampleQueue');
    queue.grant(new iam.ServicePrincipal('s3.amazonaws.com', {
      conditions: {
        ArnLike: {
          'aws:SourceArn': cdk.Arn.format({
            service: 's3',
            region: '',
            account: '',
            resource: props.bucketName
          }, this)
        }
      }
    }), 'sqs:SendMessage', 'sqs:GetQueueAttributes', 'sqs:GetQueueUrl');
  }
}

