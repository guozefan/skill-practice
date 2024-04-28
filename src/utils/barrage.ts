import { barrages } from '@/utils/interface'


export class barrage {
  dom: HTMLElement | null = null;
  tagList: barrages.tag[] = []
  constructor() {

  }
  createTag(tag: barrages.tag) {

  }

  instDoms(dom: string) {
    this.dom = document.getElementById(dom)

  }

}


