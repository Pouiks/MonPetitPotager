import React from 'react';
import styled from 'styled-components'
import Styles from '../Config/theme/styles';
import font from '../Config/theme/fonts.js'
import H1 from '../Components/H1'
import H3 from '../Components/H3'
import Text from '../Components/Text';
import ImgTop from '../Components/ImgTop';

const Body = styled.div`
padding: ${Styles.padding.lg};
`
const Intro = styled.div`
display: flex;
flex-direction: column;
text-align: center;
`
const Paragraph = styled.div`
padding: ${Styles.padding.nm};
`
const Li = styled.li`
font-size: ${font.size.paragraph};
`
const ParagraphTitle = styled.p`
font-size: ${font.size.description};
`

const Legals = () => {
    return (
        <div>
            <ImgTop src="/images/shovel-planted-soil-garden-flowerpots.jpg" alt="image decorative" />

            <Body>

                <Intro>
                    <H1
                        content="MENTIONS LÉGALES" />
                </Intro>

                <Paragraph>
                    <H3
                        content="IDENTITÉ" />

                    <Text
                        content="Nom du site web : Mon Petit Potager" />

                    <Text
                        content="Adresse du site : https://monpetitpotager.net" />

                    <Text
                        content="Propriétaire : Groupe 03 - Calendrier de plantation, Ecole O'Clock, Promo Phénix" />

                    <Text
                        content="Responsable de publication : Groupe 03 - Calendrier de plantation, Ecole O'Clock,  Promo Phénix" />

                    <Text
                        content="Hébergement :" />
                </Paragraph>

                <Paragraph>
                    <H3
                        content="CONDITIONS D’UTILISATION" />

                    <Text
                        content="L’utilisation du présent site implique l’acceptation pleine et entière des conditions générales d’utilisation décrites ci-après." />

                    <Text
                        content="Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment." />

                </Paragraph>

                <Paragraph>

                    <H3
                        content="INFORMATIONS" />

                    <Text
                        content="Les informations et documents du site sont présentés à titre indicatif, sans de caractère exhaustif, et ne peuvent engager la responsabilité du propriétaire du site." />

                    <Text
                        content="Le propriétaire du site ne peut être tenu responsable des dommages directs et indirects consécutifs à l’accès au site." />

                </Paragraph>

                <Paragraph>
                    <H3
                        content="INTERACTIVITÉ" />

                    <Text
                        content="Les utilisateurs du site peuvent y déposer du contenu, apparaissant sur le site dans des espaces dédiés." />

                    <Text
                        content="Le contenu déposé reste sous la responsabilité de leurs auteurs, qui en assument pleinement l’entière responsabilité juridique." />

                    <Text
                        content="Le propriétaire du site se réserve néanmoins le droit de retirer sans préavis et sans justification tout contenu déposé par les utilisateurs qui ne satisferait pas à la charte déontologique du site ou à la législation en vigueur." />

                </Paragraph>

                <Paragraph>
                    <H3
                        content="PROPRIÉTÉ INTELLECTUELLE" />

                    <Text
                        content="Sauf mention contraire, tous les éléments accessibles sur le site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) restent la propriété exclusive de leurs auteurs, en ce qui concerne les droits de propriété intellectuelle ou les droits d’usage. 1" />

                    <Text
                        content="Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l’auteur.23" />

                    <Text
                        content="Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient est considérée comme constitutive d’une contrefaçon et passible de poursuites. 4" />

                    <Text
                        content="Les marques et logos reproduits sur le site sont déposés par les sociétés qui en sont propriétaires." />

                </Paragraph>

                <Paragraph>
                    <H3
                        content="LIENS" />

                    <ParagraphTitle>Liens sortants</ParagraphTitle>

                    <Text
                        content="Le propriétaire du site décline toute responsabilité et n’est pas engagé par le référencement via des liens hypertextes, de ressources tierces présentes sur le réseau Internet, tant en ce qui concerne leur contenu que leur pertinence." />

                    <ParagraphTitle>Liens entrants</ParagraphTitle>

                    <Text
                        content="Le propriétaire du site autorise les liens hypertextes vers l’une des pages de ce site, à condition que ceux-ci ouvrent une nouvelle fenêtre et soient présentés de manière non équivoque afin d’éviter :" />

                    <Text
                        content="tout risque de confusion entre le site citant et le propriétaire du site ainsi que toute présentation tendancieuse, ou contraire aux lois en vigueur." />

                    <Text
                        content="Le propriétaire du site se réserve le droit de demander la suppression d’un lien s’il estime que le site source ne respecte pas les règles ainsi définies." />

                </Paragraph>

                <Paragraph>
                    <H3
                        content="CONFIDENTIALITÉ" />

                    <Text
                        content="Tout utilisateur dispose d’un droit d’accès, de rectification et d’opposition aux données personnelles le concernant, en effectuant sa demande écrite et signée, accompagnée d’une preuve d’identité. 5678" />

                    <Text
                        content="Le site ne recueille pas d’informations personnelles, et n’est pas assujetti à déclaration à la CNIL. 9" />

                    <Text
                        content="Politique de confidentialité : se référer à la page Politique de Confidentialité" />

                </Paragraph>

                <Paragraph>
                    <ol>
                        <Li>
                            Articles L111-1 et suivants du Code de la Propriété Intellectuelle du 1er juillet 1992
                        </Li>

                        <Li>
                            Article 41 de la loi du 11 mars 1957
                        </Li>

                        <Li>
                            Article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995
                        </Li>

                        <Li>
                            Articles L.335-2 et suivants du Code de Propriété Intellectuelle
                        </Li>

                        <Li>
                            Loi n° 78-87 du 6 janvier 1978, modifiée par la loi n° 2004-801 du 6 août 2004, relative à l’informatique, aux fichiers et aux libertés
                        </Li>

                        <Li>
                            Articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés
                        </Li>

                        <Li>
                            Loi du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de données
                        </Li>

                        <Li>
                            Loi n° 2004-801 du 6 août 2004
                        </Li>

                        <Li>
                            Article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique
                        </Li>
                    </ol>
                </Paragraph>

            </Body>
        </div>

    )
}

export default Legals;