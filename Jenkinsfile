pipeline {
    agent any
    
    // ⚠️ Importante: Define las variables de entorno de BrowserStack usando las credenciales de Jenkins
    environment {
        // Debes reemplazar 'BROWSERSTACK_USERNAME_ID' y 'BROWSERSTACK_KEY_ID' con los IDs que definiste en Jenkins.
        BROWSERSTACK_USERNAME = credentials('BROWSERSTACK_CREDS') 
        BROWSERSTACK_ACCESS_KEY = credentials('BROWSERSTACK_CREDS')
    }

    stages {
        
        stage('Checkout') {
            steps {
                // Obtiene tu código fuente
                git url: 'https://github.com/Jonath117/QA2-Appium_WDIO_Cucumber_POM.git', branch: 'jenkins-pipeline'
            }
        }
        
        stage('Instalar Dependencias') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Ejecutar Pruebas BrowserStack') {
            steps {
                echo 'Ejecutando pruebas Appium/WDIO en BrowserStack...'
                
                // ⚠️ Se ejecuta WDIO, que automáticamente usará las variables BROWSERSTACK_USERNAME y BROWSERSTACK_ACCESS_KEY 
                // definidas en la sección 'environment' del pipeline.
                sh 'npx wdio run wdio.conf.js'
            }
        }
        
        stage('Generar Reporte Allure') {
            steps {
                // Si tienes un fallo, Allure genera los resultados.
                sh 'npx allure generate allure-results --clean -o allure-report'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline finalizada.'
            // Publica el reporte Allure (requiere el plugin de Allure en Jenkins)
            allure report: 'allure-report', results: ['allure-results']
        }
        failure {
            echo '¡Las pruebas fallaron!'
        }
        success {
            echo 'Pruebas exitosas.'
        }
    }
}