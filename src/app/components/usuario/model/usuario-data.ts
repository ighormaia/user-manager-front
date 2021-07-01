import { CargoData } from "../../cargo/model/cargo-data";
import { PerfilData } from "../../perfil/model/perfil-data";

export class UsuarioData {
  public idUsuario?: number;
  public nome?: string;
  public cpf?: string;
  public dataNascimento?: Date;
  public dataCadastro?: Date;
  public sexo?: string;
  public cargo?: CargoData;
  public perfis: PerfilData[] = []
}
