const isDeleted = <T extends { del_flg: number}>(entity: T) => entity.del_flg === 1;

export default isDeleted;