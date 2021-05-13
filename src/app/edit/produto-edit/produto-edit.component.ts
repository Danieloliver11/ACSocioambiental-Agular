import { environment } from './../../../environments/environment.prod';
import { produtoService } from './../../service/produto.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { AlertasService } from 'src/app/service/alertas.service';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  produto: Produto = new Produto();

  categoria: Categoria = new Categoria();
  idCategoria: number;
  listaDeCategoria: Categoria[];

  constructor(
    private produtoService: produtoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == '') {
      this.router.navigate(['/login']);

    }

    /*if(localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);

    }*/

    this.idCategoria = this.route.snapshot.params['id'];

    this.findByIdProduto(this.idCategoria);
    this.findByAllCategoria();

  }

  findByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;

    })

  }

  findByAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaDeCategoria = resp;

    })

  }

  /* ATUALIZA UMA POSTAGEM NA BASE DE DADOS */
  atualizar(){
    this.categoria.id = this.idCategoria;
    this.produto.categoria = this.categoria;

    this.produtoService.putProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp;

      this.alertas.showAlertSuccess('Postagem atualizada com sucesso!');

      this.router.navigate(['/produtos']);

    })

  }

  }

