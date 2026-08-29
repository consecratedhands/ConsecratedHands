import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

global.IS_REACT_ACT_ENVIRONMENT=true;

beforeAll(()=>{
  window.scrollTo=jest.fn();
});

let container;
let root;

beforeEach(()=>{
  window.matchMedia=jest.fn().mockImplementation(query=>({
    matches:false,
    media:query,
    addEventListener:jest.fn(),
    removeEventListener:jest.fn(),
    addListener:jest.fn(),
    removeListener:jest.fn(),
  }));
  container=document.createElement("div");
  document.body.appendChild(container);
  root=createRoot(container);
});

afterEach(()=>{
  act(()=>root.unmount());
  container.remove();
  document.body.style.overflow="";
});

async function renderFrom(pathname){
  await act(async()=>{
    root.render(<MemoryRouter initialEntries={[pathname]}><Layout><h1>Page content</h1></Layout></MemoryRouter>);
  });
}

async function click(element){
  await act(async()=>element.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true})));
}

test("mobile navigation works from every route and releases the page lock",async()=>{
  await renderFrom("/privacy");
  const toggle=container.querySelector('button[aria-label="Open menu"]');
  await click(toggle);

  const dialog=container.querySelector('[role="dialog"][aria-label="Mobile menu"]');
  expect(dialog).not.toBeNull();
  expect(document.body.style.overflow).toBe("hidden");
  expect([...dialog.querySelectorAll("a")].map(link=>link.textContent.trim())).toEqual(expect.arrayContaining([
    "Home","About","Mission","Mentorship","Volunteer","Prayer","Contact","Donate Securely",
    "Privacy Policy","Terms of Use","Youth Safeguarding",
  ]));

  await click([...dialog.querySelectorAll("a")].find(link=>link.textContent.trim()==="About"));
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(document.body.style.overflow).toBe("");
  expect(document.activeElement).toBe(container.querySelector("#main-content"));
});

test("Escape closes the mobile navigation and restores the menu button",async()=>{
  await renderFrom("/contact");
  const toggle=container.querySelector('button[aria-label="Open menu"]');
  await click(toggle);

  await act(async()=>document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true})));
  await act(async()=>new Promise(resolve=>requestAnimationFrame(resolve)));

  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(document.activeElement).toBe(toggle);
  expect(document.body.style.overflow).toBe("");
});
