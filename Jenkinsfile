pipeline {
    agent {
            label 'git-websites'
    }
    options {
       buildDiscarder(logRotator(numToKeepStr:'6'))
       disableConcurrentBuilds()
       timeout(time:50,unit:'MINUTES')
    }
    stages {
        stage('build Apache NetBeans antora website') {
            steps {
                sh 'rm -rf build'

                sh 'git clone --depth 1 --branch asf-site https://gitbox.apache.org/repos/asf/netbeans-website.git build/site'
                dir('build/site') {
	            //sh 'git checkout antora'		
		    sh 'git status'
                    sh 'git rm -r . --ignore-unmatch'
                }

                sh 'npm run clean-install'
                sh 'npm run build-noclean'                
                dir('build/site') {
		  sh 'git add .'
		  sh 'echo `git commit -m "site build"`'
                  sh 'git status'			  
                  sh 'git push https://gitbox.apache.org/repos/asf/netbeans-website.git asf-site'
		}
            }
        }
    }
}
