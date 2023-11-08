INSERT INTO schema 
(id,parent_id,"name","type",descript,data,create_at,update_at,is_enable,is_delete)
VALUES 
(1,0,'product','object','产品','{}',current_timestamp,current_timestamp,true,false),
(2,0,'version','object','版本','{}',current_timestamp,current_timestamp,true,false),
(3,0,'artifact','object','制品','{}',current_timestamp,current_timestamp,true,false),
(4,1,'name','string','名称，唯一','{"isExt":false,"isKey":true,"editable":true}',current_timestamp,current_timestamp,true,false),
(5,1,'description','string','描述','{"isExt":true,"isKey":false,"editable":true}',current_timestamp,current_timestamp,true,false),
(6, 2, 'version', 'string', '版本号', '{"isExt":false,"isKey":true,"editable":true}', current_timestamp, current_timestamp, true, false),
(7,2,'description','string','描述','{"isExt":true,"isKey":false,"editable":true}',current_timestamp,current_timestamp,true,false);
(8,2,'productName','string','关联的产品','{"isExt":true,"isKey":false,"editable":true,"extCreate":true}',current_timestamp,current_timestamp,true,false);
