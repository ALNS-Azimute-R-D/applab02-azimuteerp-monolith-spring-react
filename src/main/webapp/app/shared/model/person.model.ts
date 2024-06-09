import dayjs from 'dayjs';
import { ITypeOfPerson } from 'app/shared/model/type-of-person.model';
import { IDistrict } from 'app/shared/model/district.model';
import { GenderEnum } from 'app/shared/model/enumerations/gender-enum.model';
import { ActivationStatusEnum } from 'app/shared/model/enumerations/activation-status-enum.model';

export interface IPerson {
  id?: number;
  firstname?: string;
  lastname?: string;
  fullname?: string | null;
  birthDate?: dayjs.Dayjs;
  gender?: keyof typeof GenderEnum;
  codeBI?: string | null;
  codeNIF?: string | null;
  streetAddress?: string;
  houseNumber?: string | null;
  locationName?: string | null;
  postalCode?: string;
  mainEmail?: string;
  landPhoneNumber?: string | null;
  mobilePhoneNumber?: string | null;
  occupation?: string | null;
  preferredLanguage?: string | null;
  usernameInOAuth2?: string | null;
  userIdInOAuth2?: string | null;
  customAttributesDetailsJSON?: string | null;
  activationStatus?: keyof typeof ActivationStatusEnum;
  avatarImgContentType?: string | null;
  avatarImg?: string | null;
  typeOfPerson?: ITypeOfPerson;
  district?: IDistrict | null;
  managerPerson?: IPerson | null;
}

export const defaultValue: Readonly<IPerson> = {};
