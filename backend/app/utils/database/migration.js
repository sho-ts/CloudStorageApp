const migrate = `
  create table if not exists posts (
    id int primary key not null auto_increment ,
    uid int,
    content longtext	
  );
`;

(()=>{

})();