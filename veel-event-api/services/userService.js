const { PlayerDocument } = require('../documents/playerDocument');
const { UserDocument } = require('../documents/userDocument');
const uuidv4 = require('uuid').v4;
const fs = require('fs');
const path = require('path');

exports.AddPlayer = async (req, res) => {
    let { name } = req.body;
    name = name.trim()
    try {
        const player = await PlayerDocument.findOne({
            name: name
        })
        if (player !== null) {
            var newPlayer = new PlayerDocument({
                code: randomFiveDigitNumberGenerator(),
                name,
                id: uuidv4()
            })
            await newPlayer.save();
            return res.status(200).json(newPlayer)

        }
    } catch (err) {
        console.log(err)
        res.status(500).send('server side exception');
    }
}

exports.GetAllPlayers = async (req, res) => {
    try {
        const players = await PlayerDocument.find();
        res.status(200).json(players)
    } catch (err) {
        console.log(err)
        res.status(500).send('server side exception');
    }
}

exports.SeedUsers = async (req, res) => {
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'userData.json'), 'utf-8'));
    for (const user of jsonData) {
        const existingUser = await UserDocument.findOne({ name: user.name });

        if (!existingUser) {
            user.id = uuidv4();
            user.code = randomFiveDigitNumberGenerator();
            const newUser = new UserDocument(user);
            await newUser.save();
            console.log(`Inserted: ${user.name}`);
        } else {
            console.log(`User ${user.name} already exists.`);
        }
    }
    res.status(200).json({
        msg: "All users seeded"
    })
}

exports.GetMyInfo = async (req, res) => {
    const { code } = req.query;
    try {
        const user = await UserDocument.findOne({
            code
        })
        if (user == null) {
            return res.status(404).json({
                msg: "User not found"
            })
        }
        return res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
        res.status(500).send('server side exception');
    }
}

exports.SeedPlayers = async (req, res) => {
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'playerData.json'), 'utf-8'));
    for (const player of jsonData) {
        const existingPlayer = await PlayerDocument.findOne({ name: player.name });
        if (!existingPlayer) {
            player.id = uuidv4();
            const newPlayer = new PlayerDocument(player);
            await newPlayer.save();
            console.log(`Inserted: ${player.name}`);
        } else {
            console.log(`Player ${player.name} already exists.`);
        }
    }
    res.status(200).json({
        msg: "All players seeded"
    })
}

const randomFiveDigitNumberGenerator = () => {
    return Math.floor(10000 + Math.random() * 90000);
}

exports.Login = async (req, res) => {
    const { code } = req.query;
    try {
        const user = await UserDocument.findOne({
            code
        })
        if (user == null) {
            return res.status(404).json({
                msg: "User not found"
            })
        }
        return res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).send('server side exception');
    }
}

exports.ListUsersByPoints = async (req, res) => {
    try {
        const users = await UserDocument.find().sort({ points: -1 });

        return res.status(200).json(users);
    } catch (error) {
        console.error('Error listing users by points:', error);
        res.status(500).json({ msg: "Server side exception" });
    }
}