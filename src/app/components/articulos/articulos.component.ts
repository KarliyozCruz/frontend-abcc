import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticulosService } from 'src/app/services/articulos.service';
import { ClasesService } from 'src/app/services/clases.service';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { FamiliasService } from 'src/app/services/familias.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulosForm: FormGroup;
  departamentosArray: IDepartamento[];
  clasesArray: IClase[];
  familiasArray: IFamilia[];
  isCreating: boolean;
  formEnabled: boolean;
  articuloId: number;

  constructor(private fb: FormBuilder, 
              private articulosService: ArticulosService,
              private departamentosService: DepartamentosService,
              private clasesService: ClasesService,
              private familiasService: FamiliasService,) { 
    this.articulosForm = this.fb.group({
      sku: [null, [Validators.required, Validators.min(0), Validators.max(999999)]],
      articulo: [{value: null, disabled: true}, [Validators.required, Validators.maxLength(15)]],
      marca: [{value: null, disabled: true}, [Validators.required, Validators.maxLength(15)]],
      modelo: [{value: null, disabled: true}, [Validators.required, Validators.maxLength(20)]],
      departamento: [{value: null, disabled: true}, [Validators.required]],
      clase: [{value: null, disabled: true}, [Validators.required]],
      fecha_alta: [{value: null, disabled: true}, [Validators.required]],
      stock: [{value: null, disabled: true}, [Validators.required, Validators.min(0), Validators.max(99999999)]],
      cantidad: [{value: null, disabled: true}, [Validators.required, Validators.min(0), Validators.max(99999999)]],
      descontinuado: 0,
      fecha_baja: [{value: null, disabled: true}, [Validators.required]],
      familia_id: [{value: null, disabled: true}, [Validators.required]],
    });
    this.departamentosArray = [];
    this.clasesArray = [];
    this.familiasArray = [];
    this.isCreating = false;
    this.formEnabled = false;
    this.articuloId = 0;
  }

  ngOnInit(): void {
    this.departamentosService.getAllDepartamentos().subscribe(({data}) => {
      this.departamentosArray = [...data as IDepartamento[]];
    });
  }

  onSelectDepartamento(): void {
    this.clase?.reset();
    this.familia?.reset();
    this.clase?.disable();
    this.familia?.disable();
    if(this.departamento?.value){
      this.getClasesByDepartamento();
    }
  }

  onSelectClase(): void {
    this.familia?.reset();
    this.familia?.disable();
    if(this.clase?.value){
      this.getFamiliasByClase();
    }
  }

  onSubmit(): void {
    const sku = this.sku?.value;
    if(!sku){
      this.sku?.markAsTouched();
    }else{
      this.articulosForm.reset({descontinuado: 0});
      this.sku?.patchValue(sku);
    }
    if(this.sku?.value && this.sku?.valid){
      this.articulosService.getArticulosBySku(this.sku?.value).subscribe(({data,ok,error}) => {
        if(!data){
          this.articulosForm.enable();
          this.formEnabled = true;
          this.isCreating = true;
          this.clase?.disable();
          this.familia?.disable();
          this.fecha_alta?.disable();
          this.fecha_baja?.disable();
        }else{
          this.articuloId = data.id!;
          this.articulosForm.enable();
          this.formEnabled = true;
          this.isCreating = false;
          this.articulosForm.patchValue(data);
          this.departamento?.patchValue(data.familia?.clase?.departamento_id);
          this.clase?.patchValue(data.familia?.clase_id);
          this.familia?.patchValue(data.familia_id);
          this.getClasesAndFamilias(this.departamento?.value, this.clase?.value);
          this.fecha_alta?.disable();
          this.fecha_baja?.disable();
        }
      });
    }
  }

  transformToSend(): IArticulo {
    let articuloNuevo: IArticulo = {};
    this.fecha_alta?.enable();
    this.fecha_baja?.enable();
    this.articulosForm.get('fecha_alta')?.patchValue(this.dateNow('en-CA'));
    this.articulosForm.get('descontinuado')?.value ?  this.articulosForm.get('fecha_baja')?.patchValue(this.dateNow('en-CA')) :
                                                      this.articulosForm.get('fecha_baja')?.patchValue("1900-01-01");
    articuloNuevo = {...this.articulosForm.value};
    delete (articuloNuevo as any)['departamento'];
    delete (articuloNuevo as any)['clase'];
    return articuloNuevo;
  }

  dateNow(format: string): string {
    const date = new Date().toLocaleDateString(format);
    return date;
  }

  getClasesByDepartamento(): void {
    this.clasesService.getAllClasesByDepartamento(this.departamento?.value).subscribe(({data}) => {
      this.clasesArray = [...data as IClase[]];
      this.clase?.enable();
    });
  }

  getFamiliasByClase(): void {
    this.familiasService.getAllFamiliasByClase(this.clase?.value).subscribe(({data}) => {
      this.familiasArray = [...data as IFamilia[]];
      this.familia?.enable();
    });
  }

  saveArticulo(): void {
    this.articulosForm.markAllAsTouched();
    if(this.articulosForm.valid && this.articulosForm.get('cantidad')?.value <= this.articulosForm.get('stock')?.value){
      this.articulosService.createArticulo(this.transformToSend()).subscribe(({ok, error}) => {
        console.log(ok, error);
      });
      this.initForm();
    }
  }

  updateArticulo(): void {
    this.articulosForm.markAllAsTouched();
    if(this.articulosForm.valid && this.articulosForm.get('cantidad')?.value <= this.articulosForm.get('stock')?.value){
      this.articulosService.updateArticulo(this.transformToSend(),this.articuloId).subscribe(({ok, error}) => {
        console.log(ok, error);
      });
      this.initForm();
    }
  }

  deleteArticulo(): void {
    if(this.articuloId > 0){
      this.articulosService.deleteArticulo(this.articuloId).subscribe(({ok, error}) => {
        console.log(ok, error);
      });
      this.initForm();
    }
  }

  initForm(): void {
    this.articulosForm.reset({descontinuado: 0});
    this.articulosForm.disable();
    this.sku?.enable();
    this.descontinuado?.enable();
    this.formEnabled = false;
    this.articuloId = 0;
  }

  getClasesAndFamilias(departamentoId: number, claseId: number): void {
    this.clasesService.getAllClasesByDepartamento(departamentoId).subscribe(({data}) => {
      this.clasesArray = [...data as IClase[]];
    });
    this.familiasService.getAllFamiliasByClase(claseId).subscribe(({data}) => {
      this.familiasArray = [...data as IClase[]];
    });
  }

  get sku() { return this.articulosForm.get('sku'); }
  get cantidad() { return this.articulosForm.get('cantidad'); }
  get stock() { return this.articulosForm.get('stock'); }
  get departamento() { return this.articulosForm.get('departamento'); }
  get descontinuado() { return this.articulosForm.get('descontinuado'); }
  get clase() { return this.articulosForm.get('clase'); }
  get familia() { return this.articulosForm.get('familia_id'); }
  get fecha_alta() { return this.articulosForm.get('fecha_alta'); }
  get fecha_baja() { return this.articulosForm.get('fecha_baja'); }

}
