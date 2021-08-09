import GoogleSpreadsheet from "google-spreadsheet/lib/GoogleSpreadsheet";

export default async function handler(req, res) {
    const doc = new GoogleSpreadsheet("1UgrWOk-AVYIg8z1pTiHtcNuhqnxTfWUEX3zpX4Vh8FI");

    // or preferably, loading that info from env vars / config instead of the file
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });
    await doc.loadInfo();
    let sheet = await doc.sheetsByTitle["Pairings"];
    let parings = await sheet.getRows();

    // put it in room format
    // excludes header row
    let curRow = parings[0];
    let rounds = [];

    let roundNames = Object.keys(parings[0]).filter(a => a.toLowerCase().includes("round"));

    let teams = doc.sheetsByTitle["Teams"];
    let teamNames = await teams.getRows();
    let teamNameDict = {};
    teamNames.forEach((tn) => {
        teamNameDict[tn.code] = {
            names: [],
            discordIds: [],
        };
        if (tn.person1) teamNameDict[tn.code].names.push(tn.person1);
        if (tn.person2) teamNameDict[tn.code].names.push(tn.person2);
        if (tn.person3) teamNameDict[tn.code].names.push(tn.person3);

        if (tn.dperson1) teamNameDict[tn.code].discordIds.push(tn.dperson1);
        if (tn.dperson2) teamNameDict[tn.code].discordIds.push(tn.dperson2);
        if (tn.dperson3) teamNameDict[tn.code].discordIds.push(tn.dperson3);
    });

    console.log(teamNameDict);
    for (let j = 0; j < roundNames.length; j++) {
        let i = 0;
        let roundName = roundNames[i];
        let thisRound = {
            title: roundName,
            rooms: [],
        };
        let tmp = { teams: [] };
        while (curRow = parings[i]) {
            switch (i % 5) {
                case 0:
                    if (tmp) {
                        thisRound.rooms.push(tmp);
                        tmp = { teams: [] };
                    }

                    tmp.teams.push({ id: curRow[roundName], members: teamNameDict[curRow[roundName]].names, discordIds: teamNameDict[curRow[roundName]].discordIds });
                case 1:
                    tmp.teams.push({ id: curRow[roundName], members: teamNameDict[curRow[roundName]].names, discordIds: teamNameDict[curRow[roundName]].discordIds });
                case 2:
                    tmp.judge = { id: curRow[roundName], name: teamNameDict[curRow[roundName]].names[0], discordId: teamNameDict[curRow[roundName]].discordIds[0] };
                default:
                    i++;
            }
        }
        // loop through and get members and ids


        thisRound.rooms = thisRound.rooms.filter(a => !!a.teams.length);
        rounds.push(thisRound);
    }
    res.json(rounds);
}

/**
 {
        title: 'Round 1',
        rooms: [
            {
                vc: 1,
                judge: {
                    id: 'JUDGE1',
                    name: 'Carter Demaray',
                },
                teams: [
                    {
                        id: 'PF1',
                        members: ['Hajrah Iqbal', 'Savannah Kloster'],
                    },
                    {
                        id: 'PF2',
                        members: ['Lily Christian', 'Sophie Munson'],
                    }
                ],
            },
            {
                vc: 2,
                judge: {
                    id: 'JUDGE2',
                    name: 'Srishti Kumari',
                },
                teams: [
                    {
                        id: 'PF3',
                        members: ['Hashmita Nittala', 'Samanvi Tummala'],
                    },
                    {
                        id: 'PF4',
                        members: ['Emily Hua', 'Sampada Nepal'],
                    }
                ],
            },
        ],
    },
 */
