import React from 'react'
import { Grid, Typography, Box, Button, useTheme, useMediaQuery, Stack } from "@mui/material";

export default function TermsandConditions() {

    const boldStyle = {
        fontWeight: 'bold',
        fontSize: '1rem'
        // color: '#000000 !important', // Reemplaza con tu color hexadecimal específico
    };

    const boldBlackStyle = {
        fontWeight: 'bold',
        fontSize: '0.9rem',
        color: '#000000 !important'
    };

    const linkStyle = {
        textDecoration: 'underline',
        color: '#0000FF !important', // Color azul para el texto y el subrayado
        cursor: 'pointer',
    };

    const h1Style = {
        color: '#000000 !important', // Tu color específico
        fontSize: '1.5rem', // Tu tamaño específico
        marginBottom: '1rem', // Margin bottom como ejemplo
    };

    const pStyle = {
        // fontFamily: "Montserrat-Medium",
        fontWeight: 'light',
        color: '#525252', // Otro color específico
        fontSize: '0.9rem', // Otro tamaño específico
    };


    const h3Style = {
        color: '#654321', // Otro color específico
        fontSize: '1.5rem', // Otro tamaño específico
        marginBottom: '0.5rem', // Margin bottom como ejemplo
    };


    const baseStyle = {
        marginTop: '1rem !important',
        marginBottom: '1rem !important',
        // Aquí puedes agregar otros estilos base comunes
    };


    const liStyle = {
        // color: 'black',
        // lineHeight: '1.5rem',
        // marginTop: '1rem !important',
        // marginBottom: '1rem !important',
        // Aquí puedes agregar otros estilos base comunes
    };


    const urlDictionary = {
        FERPA: "https://www.ed.gov/FERPA",
        CIPA: "https://www.fcc.gov/consumers/guides/childrens-internet-protection-act",
        IDEA: "https://sites.ed.gov/idea/",
        FAFSA: "https://fsapartners.ed.gov/knowledge-center/fsa-handbook/2023-2024/vol2/ch7-record-keeping-privacy-electronic-processes",
        DigitalStateLawPR: "https://www.lexjuris.com/lexlex/Leyes2000/lex2000110.htm",
        PublicDocumentsAdministration: "https://www.pr.gov/",
        StudentRightsCharterPR: "https://www2.pr.gov/agencias/oech/Pages/Carta-Derechos.aspx",
        DepartmentOfEducationPR: "https://www.de.pr.gov/",
        StudentRegulationAndCompulsoryAssistance: "https://www.de.pr.gov/",
        OfficialCircularsAndMemos: "https://www.de.pr.gov/",
        mailToAyudaPortalCert: "mailto:AyudaPortalCert@de.pr.gov"
    };


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'column', p: '3rem 3rem', textAlign: 'justify' }}>
                <Typography variant="h1" component="h1" gutterBottom sx={{ ...h1Style, ...baseStyle }}>
                    Política de Privacidad
                </Typography>

                <Typography variant="body1" component="p" gutterBottom sx={{ ...pStyle, ...baseStyle }}>
                    La política pública con relación al <span style={boldStyle}>Portal de Certificaciones Académicas </span> del
                    <span style={boldStyle}> Departamento de Educación
                        de Puerto Rico</span> es sencilla: No se recopilará ninguna información personal del USUARIO al acceder el Portal,
                    a menos que dicha información sea proporcionada voluntariamente.
                </Typography>

                <Typography variant="body1" component="p" gutterBottom sx={{ ...pStyle, ...baseStyle }}>
                    En esta declaración orientamos al USUARIO, con relación a qué información es recopilada
                    automáticamente; para qué se recopila la referida información; el uso que se le da y con quiénes es
                    compartida la información; las alternativas que tiene el USUARIO para controlar el uso de su información
                    personal; cómo lograr acceso a su información, y las medidas de seguridad utilizadas para proteger la
                    seguridad de la información que se recolecta y guarda en la base de datos. Además de las leyes y
                    regulaciones que protegen la información provista por el USUARIO.
                </Typography>

                <Typography variant="body1" component="p" sx={{ ...pStyle, ...baseStyle }}>
                    <ol>
                        <li style={liStyle}>
                            <span style={boldStyle}> Información recopilada automáticamente</span>. Al solicitar Servicios a través del Portal de
                            Certificaciones Académicas del <span style={boldStyle}>Departamento de Educación de Puerto Rico</span>, se le pide a los
                            USUARIOS información personal con el único propósito de poder brindarle los Servicios solicitados y
                            comprobar la identidad del USUARIO. Además, el servidor del Portal recoge automáticamente cierta
                            información de carácter no-identificable sobre los USUARIOS del Portal. En específico, cada vez que
                            se reciba una solicitud de protocolo de transmisión de hipertexto(http request), se recogerá y
                            guardará información en los ficheros sobre la fecha y la hora de la solicitud, la dirección del protocolo
                            de Internet de donde se origina la solicitud, el propósito de ésta, el tipo de navegador y sistema
                            operativo que se utilizó para ver el Portal, las secciones del Portal que se visitaron y la página externa
                            que originó la visita al Portal, entre otros.
                        </li>

                        <li style={liStyle}>
                            <span style={boldStyle}>Para qué se recopila información personal de los USUARIOS</span>
                            . Se guardará información personal
                            sobre los USUARIOS (por ejemplo, su nombre, dirección de correo electrónico, número de seguro
                            social, número de pasaporte etc.) solamente si éstos deciden proveerla libre y voluntariamente. La
                            información personal que voluntariamente provea el USUARIO al momento de acceder los Servicios
                            se utilizará únicamente con el propósito de brindar los Servicios solicitados, comprobar la identidad
                            del USUARIO y garantizar la seguridad y confiabilidad de la transacción.
                        </li>

                        <li style={liStyle}>
                            <span style={boldStyle}>Cómo se usa la información personal de los USUARIOS</span>
                            : La información del USUARIO recogida en
                            o a través del <span style={boldStyle}>Portal de Certificaciones Académicas </span> del Departamento de Educación de Puerto
                            Rico no será vendida ni cedida a terceros. La información personal que el USUARIO provea en este
                            Portal será utilizada solamente para la administración y el manejo de los Servicios ofrecidos en el
                            mismo y para otros propósitos descritos en esta declaración o en el sitio en donde se solicite la
                            información. También, se podrá recopilar información de tipo genérico para propósitos estadísticos y
                            para el mantenimiento y mejoramiento del Portal. Con ese fin, se analizará dicha información de vez
                            en cuando para determinar los intereses de los USUARIOS y la frecuencia con la cual visitan nuestros
                            clientes los sitios y las páginas web de este Portal. La información recogida para estos fines está en
                            un formato que no permite identificar personalmente al USUARIO.
                        </li>

                        <li>
                            <span style={boldStyle}> Con quién se comparte la información personal de los USUARIOS</span>
                            : La información personal de los
                            USUARIOS podrá ser compartida con las agencias, dependencias y corporaciones públicas del
                            Gobierno de Puerto Rico con las cuales el USUARIO desee llevar a cabo una transacción. En tales
                            ocasiones, únicamente será revelada la información que sea necesaria para llevar a cabo dicha
                            transacción. También podrá revelarse información a las agencias (locales y federales) responsables de
                            mantener la ley y el orden público en Puerto Rico, únicamente si dicha pulgación es autorizada o
                            requerida por la legislación aplicable o por una orden judicial.
                        </li>

                        <li>
                            <span style={boldStyle}>Alternativas del USUARIO para controlar el uso de su información personal</span>
                            : En casos en que la
                            legislación aplicable no permita pulgar la información personal del USUARIO o que no medie una
                            orden judicial, la Administración del Portal no podrá compartir información personal con otras
                            personas, a menos que obtenga consentimiento del USUARIO.
                        </li>

                        <li>
                            <span style={boldStyle}>Acceso a la información personal recopilada</span>
                            . Cada USUARIO tendrá acceso a su información
                            personal que conste en su perfil recopilada en o a través del Portal. La Administración del Portal se
                            compromete a corregir cualquier error relativo a su información personal que usted notifique a la
                            siguiente dirección: <span style={boldBlackStyle}><a href={urlDictionary.mailToAyudaPortalCert} target="_blank" rel="noopener noreferrer" style={linkStyle}>AyudaPortalCert@de.pr.gov</a></span>
                        </li>

                        <li>
                            <span style={boldStyle}>Protección de la información recopilada</span>
                            . La Internet fue diseñada originalmente como un sistema
                            abierto sin ningún sistema de seguridad. Sin embargo, la información de los USUARIOS recopilada y
                            guardada será protegida y no se utilizará la Internet para proveer Servicios a menos que se pueda
                            realizar de una manera segura. A esos efectos, se tomarán las precauciones razonables para
                            mantener la seguridad, confidencialidad e integridad de la información recopilada en y a través de
                            este Portal. Ocasionalmente, se contratarán terceros para que provean ciertos Servicios con respecto
                            al Portal y su base de datos, a quienes se les solicitará las debidas exigencias legales de manera que
                            no comprometan la seguridad, confidencialidad e integridad de la información personal a la cual
                            dichos contratistas puedan tener acceso durante el curso del desempeño de sus Servicios.
                        </li>

                        <li>
                            <span style={boldStyle}>Consentimiento e Información de personas menores de 18 años</span>
                            : No se recopilará información de
                            contacto de menores de <span style={boldStyle}>18 años</span> (por ejemplo, nombre, dirección, dirección electrónica o número de
                            teléfono) sin el consentimiento previo de la(s) persona(s) con patria potestad. Una vez se obtenga el
                            consentimiento, dicha información será utilizada únicamente según sea necesario para llevar a cabo
                            la transacción que sea solicitada. La información identificable del menor no será pulgada ni
                            compartida, a menos que la(s) persona(s) con patria potestad preste(n) su consentimiento a tales
                            efectos. El consentimiento que se haya dado sobre la información de un menor siempre podrá ser
                            revocado. El Portal validará la identidad del USUARIO con el número provisto de su Licencia/Real ID
                            a través del Sistema IDEAL PRITS-DETOP para asegurarse que el USUARIO es el verdadero dueño de
                            la información solicitada. Esto a tenor y en cumplimiento con la Ley Federal, <a href={urlDictionary.FERPA} target="_blank" rel="noopener noreferrer" style={linkStyle}>Family Educational Rights
                                and Privacy Act (FERPA)</a>
                        </li>

                        <li>
                            <span style={boldStyle}>Solicitud y envío de Información o Certificación Académica</span>
                            : La solicitud de información
                            académica será provista siempre y cuando esté en PODER del ESTADO entiéndase que esté ubicada
                            y archivada en las Escuelas, Oficinas y/o Centros de Archivo que formen parte del Sistema Educativo
                            del <span style={boldStyle}>Departamento de Educación de Puerto Rico</span>.
                        </li>

                        <li>
                            <span style={boldStyle}>Advertencia con respecto al uso del correo electrónico </span>
                            : El correo electrónico no es un medio
                            seguro para la transmisión de información personal. El Departamento de Educación sólo utilizará el
                            correo electrónico provisto por el USUARIO para tramitar las certificaciones académicas y facilitar la
                            información de manera digital. Por lo tanto, se le advierte al USUARIO que no debe enviar
                            información personal ni contributiva a través del correo electrónico. El Portal ofrece la oportunidad
                            de hacer preguntas, solicitar más información y enviar comentarios. El uso de este servicio es
                            voluntario y puede requerir su dirección de correo electrónico. La información que usted provea por
                            este medio no será cifrada (encrypted), por lo cual podría ser interceptada durante su transmisión
                            por terceras personas ajenas al Departamento de Educación. El Departamento de Educación no
                            solicitará mediante correo electrónico que el USUARIO provea datos sobre información personal,
                            tributaria o financiera. Por tanto, en ninguna circunstancia el USUARIO debe responder a mensajes
                            de correos electrónicos no solicitados que aleguen ser provenientes del Departamento de
                            Educación. De recibir un correo electrónico sospechoso favor de reenviarlo a la siguiente
                            dirección: OSIATD@de.pr.gov .
                        </li>

                        <li>
                            <span style={boldStyle}>Sobre el uso de Cookies</span>
                            : Utilizamos cookies en nuestro sitio para personalizar la experiencia de
                            nuestros visitantes y para apoyar algunas de las funciones necesarias. También usamos cookies para
                            entender mejor cómo los visitantes usan nuestro sitio. Una cookie es un archivo de texto que se
                            coloca en el disco de su computadora por un servidor web. Las cookies no se pueden usar para
                            ejecutar programas o infectar su computadora con virus. Las cookies son asignadas a su navegador y
                            perfil de su computadora y sólo pueden ser leídas por el servidor web que le asignó la cookie a usted.
                            Usted también tiene opciones con respecto a las cookies. Al modificar las preferencias del navegador,
                            tiene la opción de aceptar todas las cookies, ser notificado cuando se coloque una cookie o de
                            rechazar todas las cookies. Sin embargo; tenga en cuenta que, si rechaza algunas o todas las cookies,
                            su experiencia en éste y en otros sitios de Internet puede que no sea una completa. Además, si usted
                            no permite las cookies, usted no será capaz de tomar ventaja de la entrega de contenido
                            personalizado que ofrecen otros sitios de Internet o nosotros.
                        </li>

                        <li>
                            <span style={boldStyle} > Leyes aplicables relacionadas a la conservación y pulgación información:</span>
                            <br /> <br />

                            <ul style={{ listStyleType: 'disc' }}>
                                <li><a href={urlDictionary.FERPA} target="_blank" rel="noopener noreferrer" style={linkStyle}>Family Educational Rights and Privacy Act (FERPA)</a></li>
                                <li><a href={urlDictionary.CIPA} target="_blank" rel="noopener noreferrer" style={linkStyle}>Children's Internet Protection Act (CIPA) | Federal Communications Commission (fcc.gov)</a></li>
                                <li><a href={urlDictionary.IDEA} target="_blank" rel="noopener noreferrer" style={linkStyle}>Individuals with Disabilities Education Act (IDEA)</a></li>
                                <li><a href={urlDictionary.FAFSA} target="_blank" rel="noopener noreferrer" style={linkStyle}>Free Application for Federal Student Aid (FAFSA) Guide 2023-2024 Federal Student Aid Handbook.</a></li>
                                <li>Ley Núm. 110-2000; Ley del Estado Digital de Puerto Rico</li>
                                <li>Ley Núm. 5, 8 de diciembre de 1955- Administración de Documentos Públicos</li>
                                <li>Reglamento 4284-Administración de Documentos Públicos</li>
                                <li>Ley 195-2012; La Carta de Derechos del Estudiante de Puerto Rico</li>
                                <li>Ley Núm. 149-1999; Ley Orgánica del <span style={boldStyle}>Departamento de Educación de Puerto Rico</span></li>
                                <li>Reglamento 9243 Reglamento de Estudiantes y Asistencia Obligatoria</li>
                                <li>Cartas Circulares y Memorandos Oficiales emitidos por el Departamento de Educación aplicable a la pulgación, administración, conservación y preservación de los documentos vigentes.</li>
                            </ul>
                        </li>
                    </ol>
                </Typography >
                <br /><br />

                <Typography variant="h1" component="h1" gutterBottom sx={{ ...h1Style, ...baseStyle }}>
                    Condiciones y Términos de Uso
                </Typography>

                <Typography variant="body1" component="p" sx={{ ...pStyle, ...baseStyle }}>
                    El Departamento de Educación podrá, en cualquier momento y sin previo aviso, revisar, sustituir o
                    modificar esta Política de Privacidad, Condiciones y sus Términos de Uso; así como, cualquier otra
                    información contenida en este Portal. También podrá realizar ampliaciones, restricciones o cambios en los
                    servicios o programas descritos en este sitio web en cualquier momento y sin previo aviso.
                </Typography>

                <Typography variant="body1" component="p" sx={{ ...pStyle, ...baseStyle }}>
                    Este Portal puede tener enlaces a otros sitios de interés e información o servicios localizados en páginas web de otras entidades
                    u organizaciones públicas o privadas.  El Departamento de Educación provee dichos enlaces únicamente para la información y
                    conveniencia de sus USUARIOS, por lo que, al momento de accederlas, estos reconocen que están abandonando el dominio del sitio web
                    del <span style={boldStyle}>Portal de Certificaciones Académicas </span> del Departamento de Educación y que estarán sujetos a las condiciones de uso
                    y política de privacidad de la página web a la que los dirige el enlace. El Departamento de Educación no controla ni
                    garantiza la exactitud, relevancia, veracidad, actualización o integridad de la información contenida en dichas páginas web.
                    El proveer un enlace tampoco equivale a un endoso de dichas páginas web, su visión, la información o a
                    los servicios que estas brindan.
                </Typography>

                <Typography variant="body1" component="p" sx={{ ...pStyle, ...baseStyle }}>
                    <span style={boldStyle}>Obligación de hacer un uso correcto del Portal y de los Servicios:</span>
                </Typography>

                <Typography variant="body1" component="p" sx={{ ...pStyle, ...baseStyle }}>
                    El USUARIO se compromete a utilizar el <span style={boldStyle}>Portal de Certificaciones Académicas</span> del Departamento de Educación y
                    los servicios disponibles de conformidad con las leyes aplicables, esta Política y sus Términos de Uso.
                    El USUARIO se obliga a no utilizar el Portal para actividades contrarias a la ley, la moral, las buenas costumbres y
                    el orden público, con fines ilícitos o para lesionar derechos de terceros. El Departamento de Educación podrá denegar,
                    retirar o suspender el acceso, sin necesidad de previo aviso, a todo USUARIO que incumpla con los términos de uso aquí dispuestos.
                </Typography>


                <Typography variant="body1" component="p" sx={{ ...pStyle, ...baseStyle }}>
                    El <span style={boldStyle}>Departamento de Educación de Puerto Rico</span> es el titular de todos los derechos de propiedad intelectual
                    y derechos morales de autor sobre este Portal, su contenido, diseño, dominio, logos y signos distintivos, sin
                    que pueda entenderse que el acceso al Portal y/o a los servicios le atribuye al USUARIO una cesión, licencia
                    o derecho alguno sobre ellos.
                </Typography>

                <Typography variant="body1" component="p" sx={{ ...pStyle, ...baseStyle }}>
                    Queda estrictamente prohibida la comercialización en cualquier forma del material e información
                    contenida en el Portal, sin contar con la autorización escrita previa del
                    <span style={boldStyle}>Departamento de Educación de Puerto Rico</span>.
                </Typography>

                <Typography variant="body1" component="p" sx={{ ...pStyle, ...baseStyle }}>
                    De igual forma, aunque los contenidos, según lo antes dispuesto, sean propiedad intelectual del
                    Departamento de Educación o de terceros, sin que puedan entenderse cedidos al USUARIO, este último
                    podrá consultar, copiar y almacenar en el disco duro de su computadora o en cualquier otro dispositivo,
                    imprimir o reproducir el material disponible en este sitio web, exclusivamente para su uso personal o
                    privado, o el que se realice dentro de su empresa u organización, haciendo mención en todo momento de
                    la propiedad que sobre éste posee el Departamento de Educación, quedando terminantemente prohibido
                    realizar alteraciones o modificaciones de su contenido.
                </Typography>
            </Box >
        </>
    )
}
