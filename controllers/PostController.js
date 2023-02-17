import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get posts ',
        });
    }
}


export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete(
            {
                _id: postId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: 'Failed to delete post ',
                    });
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Post do not found',
                    });
                }
                res.json({
                    seccess: true,
                });
            },

        );
    } catch (err) {
        console.log("OSFDSFDS", err);
        res.status(500).json({
            message: 'Failed to get post',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate({
            _id: postId,
        },
            {
                $inc: { viewsCount: 1 },

            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        message: 'Failed to get post',
                    });
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Post do not found',
                    })
                }
                res.json(doc);

            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get post',
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tages: req.body.tages,
            user: req.userId,
        });
        const post = await doc.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create post',
        });
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tages: req.body.tages,
                user: req.userId,
            }

        );
        res.json({
            secccess: true,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update post',
        });
    }
}