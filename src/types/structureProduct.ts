export enum EFieldsTypes{
  STRING='string',
  NUMBER='number',
  UNIQUE='unique',
  WITH_DEFAULT='with-default',
  DATE='date',
  FILE='file'
}

export interface IBaseStructureField{
  id: string;
  nameRU: string;
  nameUA: string;
};

export interface IStructureFieldProduct  extends IBaseStructureField{
  type: EFieldsTypes;
  length: string;
  isCanDel: boolean;
  isNotNull: boolean;
  isCharact: boolean;
  defaults: IBaseStructureField [];
  dId?: string;
}