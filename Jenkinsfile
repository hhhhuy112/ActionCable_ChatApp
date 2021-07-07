#!groovy

pipeline {
    agent { node { label 'master' } }


    stages {
        
        stage("Build and start test image") {
            steps {
                bat """
                    docker-compose -f docker-compose-pipeline.yml build
                    docker-compose -f docker-compose-pipeline.yml up -d
                """
            }
        }

        stage("Integration Test") {
            steps {
                bat """
                    docker-compose --project-name=${JOB_NAME} run web bundle exec rspec spec
                """
            }
        }
    }
    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}

