.PHONY: build clean

build: \
	build/LICENSE.txt \
	build/style.css \
	build/404.html \
	build/index.html \
	$(patsubst ../%,build/%,$(shell find ../icons -type f)) \
	$(patsubst ../src/%,build/scripts/%,$(shell find ../src -type f))

build/LICENSE.txt: ../LICENSE
build/style.css: style.css
build/404.html: 404.html

build/icons/%: ../icons/%
	@mkdir -p $(dir $@)
	cp $< $@

build/scripts/%: ../src/%
	@mkdir -p $(dir $@)
	cp $< $@

build/index.html: generate.py template.html ../LICENSE $(shell find ../src -type f)
	@mkdir -p $(dir $@)
	./generate.py > $@

build/%:
	@mkdir -p $(dir $@)
	cp $< $@

clean:
	rm -rf build
