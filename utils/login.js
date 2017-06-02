var database = require('./database.js');

// ����Token
// ��������
// ���أ�String
exports.generateToken=function(){
    return ""+parseInt(Math.random()*100000000000)
}

// ����Token
// ����: uid(String), token(String)
// ���أ���
exports.storeToken=function(uid, token){
    database.connect(function(db){
        var uid = parseInt(uid);
        database.find(db, "users", {"uid": uid}, function(res){
            var closeDatabase=function(){db.close();};
            if(res.length==0){
                database.insert(db, "users", {"uid": uid, "token": token}, closeDatabase);
            }else{
                database.update(db, "users", {"uid": uid}, {$set: {"token": token}}, closeDatabase);
            }
        });
    });
}