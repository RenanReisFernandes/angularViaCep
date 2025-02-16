import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ViacepService } from '../../services/viacep.service';
@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,private viacepService: ViacepService){}

  ngOnInit(): void {
    this.initializeForm();
    this.observePreenchimentoSep();
     }

  initializeForm(){
    this.form = this.fb.group({
      cep:  ['', Validators.required],
      logradouro:new FormControl(''),
      bairro: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
    })
  }

  observePreenchimentoSep(){
    this.form.get('cep')?.valueChanges.subscribe(value =>{
      if(value?.length ==8){
        this.buscarCep();
      }
    })
  }

  buscarCep(){
    var cep = this.form.get('cep')?.value;
    this.viacepService.getEnderecoByCep(cep).subscribe(
      {
        next: (response)=>{
          this.form.patchValue({
            logradouro:response.logradouro,
            bairro:response.bairro,
            cidade: response.localidade,
            estado: response.uf,
          })
        },
        error: ()=>{
          console.log("Ocorreu um erro");
        }
      }
    )
  }
}
