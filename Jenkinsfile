node{
    stage('checkout del repositorio git'){
            checkout scm
    }
    stage('Elimino contenedores antiguos'){
        sh 'docker rm $(docker ps -a -q)'
    }
    stage('Contruccion del proyecto'){
        sh 'docker-compose build'
    }
        stage('Levantar contenedores'){
        sh 'docker-compose up -d'
    }

}
