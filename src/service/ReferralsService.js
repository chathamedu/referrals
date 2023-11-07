import Papa from 'papaparse';

export default class ReferralsService {
    getReferralData() {
        let data = Papa.parse('assets/data/referrals.csv');
        console.log('Finished:', data);
        return data;
    }
    getReferralDataFetch() {
        let records = [];
        return fetch('assets/data/referrals.csv')
            .then((res) => res.text())
            .then((d) => {
                let x = Papa.parse(d);
                x.data.splice(x.data.length - 1, 1);
                x.data.splice(0, 1);
                x.data.forEach((col) => {
                    var ph1 = '';
                    var tel = '';
                    if (col[1] === '' && col[2] > '') {
                        col[1] = col[2];
                        col[2] = '';
                    }
                    if (col[9] > '') {
                        // Replace special chars
                        ph1 = col[9].replaceAll(/\(/gi, '').replaceAll(/\)/gi, '').replaceAll(/-/gi, '').replaceAll(/ /gi, '');
                        if (ph1.length === 10 || ph1.length === 11) {
                            tel = ph1;
                            ph1 = '';
                        } else {
                            ph1 = col[9]; // use raw if not US format
                        }
                    }
                    let rec = {
                        category: col[0],
                        name: col[1],
                        business: col[2],
                        address1: col[3],
                        suite: col[4],
                        address2: col[5],
                        city: col[6],
                        state: col[7],
                        zip: col[8],
                        tel1: tel,
                        tel2: ph1,
                        phone: col[9],
                        fax: col[10],
                        email: col[11],
                        ins1: col[12],
                        ins2: col[13],
                        ins3: col[14],
                        note1: col[15],
                        note2: col[16],
                        note3: col[17],
                        note4: col[18],
                        note5: col[19]
                    };
                    records.push(rec);
                });

                return records;
            });
    }
}
