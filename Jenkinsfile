node{
    stage('checkout'){
            checkout scm
    }
    stage('prueba'){
        sh 'echo "hello world"'
    }
    stage('git hook'){
        sh 'echo "funciona el hook8"'
    }
    stage('contruccion del proyecto'){
        sh 'docker-compose build'
    }
}
