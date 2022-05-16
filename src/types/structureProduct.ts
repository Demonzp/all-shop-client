export enum EFieldsTypes{
  STRING='string',
  NUMBER='number',
  UNIQUE='unique',
  WITH_DEFAULT='with-default',
  FILE='file'
}

export interface IBaseStructureField{
  id: string;
  nameRU: string;
  nameUA: string;
};

export interface IStructureFieldProduct  extends IBaseStructureField{
  type: EFieldsTypes;
  isCanDel: boolean;
  defaults: IBaseStructureField [];
}