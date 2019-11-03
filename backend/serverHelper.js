module.exports = {
    returnData: (data, id) => {
        const conditions = {
            deleted_at: {$exists: false},
            _id: id
        }

        let dataQuery = data.find(conditions);

        dataQuery.exec()
        .then((err, data) => {
            console.log('return data:',data);
            if (err) return {success: false, error: err};
            return {success: false, response: data}
        });
    }
}