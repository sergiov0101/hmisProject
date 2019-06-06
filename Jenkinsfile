node{
    stage('checkout del repositorio git'){
            //Checkout del repositorio configurado 
            checkout scm
    }
    stage('Eliminar contenedores antiguos'){
        try{
            //Se detienen los contenedores que esten en ejecucion
            sh 'docker stop $(docker ps -a -q)'
            echo 'Detenidos contenedores'
        }
        catch(Exception e){
            echo 'No hay contenedores que detener'
        }

        try{
            //elimina los contenedores que existan  a
            sh 'docker rm $(docker ps -a -q)'
            echo 'Eliminados contenedores'
        }
        catch(Exception e){
           echo 'No hay contenedores que eliminar'
        }
    }
    stage('Contruccion de la api '){
        //Se contruye el proyecto docker
        dir('BACKEND') {
            sh 'docker-compose build'
        }
        
    }
        stage('Levantar contenedores'){
        //Se levantan los contenedores
        dir('BACKEND'){
            sh 'docker-compose up -d'
        }
        
    }

        stage('Contruccion del frontEnd (login Angular)'){
        //Se contruye el proyecto docker
        dir('frontend/personalProjectDra-front') {
            sh 'docker-compose build'
        }
        
    }
        stage('Levantar contenedores FronEnd'){
        //Se levantan los contenedores
        dir('frontend/personalProjectDra-front'){
            sh 'docker-compose up -d'
        }
        
    }

}
