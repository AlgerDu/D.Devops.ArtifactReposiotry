DELETE FROM schema;

INSERT INTO schema 
(id,parent_id,"name","type",descript,data,create_at,update_at,is_enable,is_delete)
VALUES 
(1,0,'product','object','产品','{}',current_timestamp,current_timestamp,true,false),
(2,0,'version','object','版本','{}',current_timestamp,current_timestamp,true,false),
(3,0,'artifact','object','制品','{}',current_timestamp,current_timestamp,true,false),
(4,1,'name','string','名称，唯一','{"isExt":false,"isKey":true,"editable":true}',current_timestamp,current_timestamp,true,false),
(5,1,'dockerName','string','docker 仓库的名称','{"isExt":true,"isKey":false,"editable":true}',current_timestamp,current_timestamp,true,false),
(6,1,'description','string','描述','{"isExt":true,"isKey":false,"editable":true}',current_timestamp,current_timestamp,true,false),
(7,2, 'version', 'string', '版本号', '{"isExt":false,"isKey":true,"editable":true}', current_timestamp, current_timestamp, true, false),
(8,2,'description','string','描述','{"isExt":true,"isKey":false,"editable":true}',current_timestamp,current_timestamp,true,false),
(9,2,'productName','string','关联的产品','{"isExt":true,"isKey":false,"editable":true,"extCreate":true}',current_timestamp,current_timestamp,true,false);
(10,3, 'name', 'string', '制品名称', '{"isExt":false,"isKey":true,"editable":true}', current_timestamp, current_timestamp, true, false),
(11,3,'type','string','制品类型。blob docker nuget','{"isExt":false,"isKey":false,"editable":true}',current_timestamp,current_timestamp,true,false),
(12,3,'productName','string','关联的产品','{"isExt":true,"isKey":false,"editable":true,"extCreate":true}',current_timestamp,current_timestamp,true,false);
(13,3,'version','string','关联的版本','{"isExt":true,"isKey":false,"editable":true,"extCreate":true}',current_timestamp,current_timestamp,true,false);
