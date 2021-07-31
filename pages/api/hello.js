import {getAccount} from '../../components/api/lib';

export default async function Hello(req, res) {
    const account = await getAccount({req});
    let rslt = await fetch('https://discord.com/api/oauth2/@me', {
        headers: {
            'Authorization': `Bearer ${account.accessToken}`,
        }
    }).then(r => r.json())

    res.json(rslt);
}
