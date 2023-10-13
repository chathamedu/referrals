import Papa from 'papaparse';

export default class ReferralsService {
    getReferralData() {
        let data = Papa.parse('http://localhost:5173/assets/data/referrals.csv');
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
                x.data.forEach((row) => {
                    let rec = {
                        category: row[0],
                        name: row[1],
                        business: row[2],
                        address1: row[3],
                        suite: row[4],
                        address2: row[5],
                        city: row[6],
                        state: row[7],
                        zip: row[8],
                        phone: row[9],
                        fax: row[10],
                        email: row[11],
                        note1: row[12],
                        note2: row[13],
                        note3: row[14]
                    };
                    records.push(rec);
                });

                return records;
            });
    }
}
