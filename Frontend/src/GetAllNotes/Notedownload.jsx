import React from 'react'
import { Page, Text, View, Document, Image, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import random from 'random-string-generator'
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    date: {
        fontSize: 12,
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: 350,
        marginBottom: 10,
        objectFit: 'contain'
    },
    notes: {
        fontSize: 14,
        lineHeight: 1.5,
    },
});



const MyDocument = ({ allnotes }) => (

    <Document >{
        allnotes.map((note, index) => {
            const s = note.ImgURL
            const ans = Number([...([...s].reverse().join("").substr(0,17))].reverse().join("").substr(0,13))
            
            return (
            <Page key={index} size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.date}>
                        {new Date(ans).toDateString()}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Image src={`${note.ImgURL}`} style={styles.image} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.notes}>{note.Notes}</Text>
                </View>
            </Page>
            );
        }
    )}
    </Document>
);


const Notedownload = ({ allnotes }) => {
    return (
        <>
            <div>
                <PDFDownloadLink
                    document={<MyDocument allnotes={allnotes} />}
                    fileName={`ShareMate_${random(10)}.pdf`}
                >
                    {({ loading }) => (
                        <button
                            style={{
                                background: 'transparent',
                                color: 'rgb(55, 65, 81)',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight:'500',
                                fontSize: '15px',
                                textDecoration: 'none'
                            }}
                        >
                            {loading ? 'Preparing...' : 'Download All Notes'}
                        </button>
                    )}
                </PDFDownloadLink>
            </div>
        </>
    )
}

export default Notedownload
