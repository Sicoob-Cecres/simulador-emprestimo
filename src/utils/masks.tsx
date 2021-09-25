export function cep(value: string){
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{5})(\d)/, "$1-$2")
  
  return value;
}

export function currency(value: string){
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2}$)/, "$1,$2")
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".")

  return value;
}

export function celPhone(value: string){
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")

  return value;
}

export function cpf(value: string){
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")

  return value;
}

export function string(value: string){
  return value;
}