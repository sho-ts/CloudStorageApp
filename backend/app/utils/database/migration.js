const migrate = `
  create table if not exists posts (
    id int primary key not null auto_increment ,
    uid int,
    content longtext,
    created_at datetime default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    add del_flg int(2) default 0;
  );
`;

(()=>{

})();