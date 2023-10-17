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

                //checkout changelog: false, poll: false, scm: scmGit(branches: [[name: '*/antora']], extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'build/site'], cloneOption(depth: 1, noTags: false, reference: '', shallow: true)], userRemoteConfigs: [[credentialsId: '9b041bd0-aea9-4498-a576-9eeb771411dd', url: 'https://gitbox.apache.org/repos/asf/netbeans-website.git']])
                sh 'git clone --depth 1 --branch antora https://gitbox.apache.org/repos/asf/netbeans-website.git build/site'
                dir('build/site') {
	            //sh 'git checkout antora'		
		    sh 'git status'
                    sh 'git rm -r .'
                }

                sh 'npm run clean-install'
                //sh 'npm run build-noclean'
                zip zipFile:'site.zip', dir:'build/site', archive:'true'
                dir('build/site') {
		  sh 'git add .'
		  sh 'echo `git commit -m "site build"`'
                  sh 'git status'			  
                  sh 'git push https://gitbox.apache.org/repos/asf/netbeans-website.git antora'
		}
            }
        }
    }
}
