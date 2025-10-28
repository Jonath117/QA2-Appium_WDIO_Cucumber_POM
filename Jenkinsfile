pipeline {
    agent any
    
    // ⚠️ Importante: Define las variables de entorno de BrowserStack usando las credenciales de Jenkins
    environment {
        BROWSERSTACK_CREDS = credentials('BROWSERSTACK_CREDS')

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
                bat 'npm install @wdio/browserstack-service'
                bat 'npm install'
            }
        }
        
        stage('Ejecutar Pruebas BrowserStack') {
            steps {
                echo 'Ejecutando pruebas Appium/WDIO en BrowserStack...'
                
                // ⚠️ Se ejecuta WDIO, que automáticamente usará las variables BROWSERSTACK_USERNAME y BROWSERSTACK_ACCESS_KEY 
                // definidas en la sección 'environment' del pipeline.
                bat "set BROWSERSTACK_USERNAME=%BROWSERSTACK_CREDS_USR%&& set BROWSERSTACK_ACCESS_KEY=%BROWSERSTACK_CREDS_PSW%&& npx wdio run wdio.conf.js"
            }
        }
        
        stage('Verificar resultados Allure') {
            steps {
                script {
                    // Validamos si la carpeta allure-results fue generada
                    if (!fileExists('allure-results')) {
                        error "❌ No se generó la carpeta allure-results. Verifica la configuración del reporter en wdio.conf.js"
                    } else {
                        echo "✅ Carpeta allure-results encontrada."
                    }
                }
            }
        }

        stage('Publicar reporte Allure en Jenkins') {
            steps {
                echo "Publicando reporte Allure..."
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']],
                    reportBuildPolicy: 'ALWAYS'
                ])
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline finalizada.'
        }
        failure {
            echo '❌ El pipeline falló. Revisa los logs en Jenkins.'
        }
        success {
            echo '🎉 Todas las etapas completadas correctamente.'
        }
    }

}