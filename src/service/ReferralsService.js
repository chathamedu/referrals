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
                    if (col[1] === '' && col[2] > '') {
                        col[1] = col[2];
                        col[2] = '';
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
