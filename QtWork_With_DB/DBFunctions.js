function createSimpleTable(tx, tablename) {
    var sql = "";

    if(tablename === "contacts"){
        sql =
            'CREATE TABLE IF NOT EXISTS contacts (' +
            'contact_id INTEGER PRIMARY KEY,' +
            'first_name TEXT NOT NULL,' +
            'last_name TEXT NOT NULL,' +
            'email TEXT NOT NULL UNIQUE,' +
            'phone TEXT NOT NULL UNIQUE' + ');'
    }else{
         sql =
            'CREATE TABLE IF NOT EXISTS newcontacts (' +
            'id INTEGER PRIMARY KEY,' +
            'name TEXT NOT NULL,' +
            'surname TEXT NOT NULL,' +
            'friends TEXT NOT NULL,' +
            'phone TEXT NOT NULL UNIQUE' + ');'
    }
console.log(sql);
    tx.executeSql(sql);
}

function addContact(tx, item1, item2, item3, item4, tablename) {
    var sql = "";

    if(tablename === "contacts"){
        sql =
            'INSERT INTO contacts (first_name, last_name, email, phone)' +
            'VALUES("%1", "%2", "%3", "%4");'.arg(item1).arg(item2).arg(item3).arg(item4);
    }else{
        sql =
            'INSERT INTO newcontacts (name, surname, friends, phone)' +
            'VALUES("%1", "%2", "%3", "%4");'.arg(item1).arg(item2).arg(item3).arg(item4);
    }

    tx.executeSql(sql);
}

function tableIsExists(tx){
    const sql =
          "SELECT name FROM sqlite_master WHERE type='table' AND name='{contacts}';";

    var result = tx.executeSql(sql);
    return typeof result.value === 'undefined' ? 0 : 1;
}

function readContacts(tx, model, tablename){
    model.clear();

    if(tablename === "contacts"){
        const sql =
              "SELECT contact_id, first_name, last_name, email, phone FROM contacts;";

        var result = tx.executeSql(sql);

        for(var i = 0; i < result.rows.length; i++){
            model.append({
                            item1: result.rows.item(i).contact_id,
                            item2: result.rows.item(i).first_name,
                            item3: result.rows.item(i).last_name,
                            item4: result.rows.item(i).email,
                            item5: result.rows.item(i).phone
                            });
        }
    }else{
        const sql =
              "SELECT id, name, surname, friends, phone FROM newcontacts;";

        result = tx.executeSql(sql);

        for(i = 0; i < result.rows.length; i++){
            model.append({
                            item1: result.rows.item(i).id,
                            item2: result.rows.item(i).name,
                            item3: result.rows.item(i).surname,
                            item4: result.rows.item(i).friends,
                            item5: result.rows.item(i).phone
                            });
        }
    }

}

function findTables(tx, tblmodel){
    const sql =
          "SELECT name FROM sqlite_master WHERE type='table';";
    var result = tx.executeSql(sql);

    for(var i = 0; i < result.rows.length; i++){
        tblmodel.append({"text": result.rows.item(i).name});
    }
}

function updateRecord(tx, cname, newvalue, idrecord, tablename){
   var sql = "";

    if(tablename === "contacts"){
        sql =
          "UPDATE " + tablename + " SET " + cname + "='" + newvalue + "' WHERE contact_id = " + idrecord + ";";
    }else{
        sql =
          "UPDATE " + tablename + " SET " + cname + "='" + newvalue + "' WHERE id = " + idrecord + ";";
    }

    tx.executeSql(sql);
}
