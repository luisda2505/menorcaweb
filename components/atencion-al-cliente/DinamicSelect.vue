<template>
    <div class="custom-select-container">
        <div class="custom-select" @click="toggleDropdown">
            <span class="select-placeholder">
                {{ label }}
            </span>
            <div v-if="selectedOption" class="selected-option">
                {{ selectedOption.length > 25 ? selectedOption.slice(0, 24) + "..." : selectedOption }} </div>
            <!-- <span class="arrow" :class="{ rotated: isOpen }">▼</span> -->
        </div>

        <div class="dropdown" v-if="isOpen">
            <input v-model="searchQuery" class="search-input" type="text" placeholder="Buscar..." />
            <ul class="dropdown-options">
                <li v-for="(option, index) in filteredOptions" :key="index" @click="selectOption(option)"
                    class="dropdown-option">
                    {{ option.label }}
                </li>
            </ul>
        </div>


    </div>
</template>

<script>
export default {
    props: {
        options: Array,
        label: String,
        type: String
    },
    watch: {
        options(newVal, oldVal) {},
    },
    data() {
        return {
            isOpen: false,
            selectedOption: null,
            selectedValue: null,
            searchQuery: "",
            optionsInput: this.options
        };
    },
    computed: {
        filteredOptions() {
            return this.optionsInput.filter(option =>
                option.label.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectOption(option) {
            this.selectedOption = option.label;
            this.selectedValue = option.value;
            this.isOpen = false;
            this.searchQuery = "";
            this.$emit('toSelectOption', this.selectedOption, this.type);
        }
    }
};
</script>

<style scoped>
select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background: #ffffff url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOS43NjEyNiAwLjI1MzE3OUMxMC4wNzk2IDAuNTgyMjY5IDEwLjA3OTYgMS4xMTAwNCA5Ljc2MTI2IDEuNDM5MTNMNS41OTQ2IDUuNzQ2ODJDNS4yNjgwOCA2LjA4NDM5IDQuNzMxOTIgNi4wODQzOSA0LjQwNTQgNS43NDY4MkwwLjIzODczNyAxLjQzOTEzQy0wLjA3OTU3OTQgMS4xMTAwNCAtMC4wNzk1Nzk0IDAuNTgyMjY4IDAuMjM4NzM3IDAuMjUzMTc4QzAuNTY1MjU3IC0wLjA4NDM5MzMgMS4xMDE0MSAtMC4wODQzOTMzIDEuNDI3OTMgMC4yNTMxNzhMNSAzLjk0NjE1TDguNTcyMDcgMC4yNTMxNzlDOC44OTg1OSAtMC4wODQzOTI5IDkuNDM0NzQgLTAuMDg0MzkyOSA5Ljc2MTI2IDAuMjUzMTc5WiIgZmlsbD0iIzE1OEEyRiIvPgo8L3N2Zz4K') no-repeat right 15px center;
}

.select-placeholder {
    content: attr(placeholder);
    display: inline-block;
    margin: 0px;
    padding: 0px 1px;
    color: #a3abcc;
    white-space: nowrap;
    transition: 0.3s ease-in-out;
    background-image: linear-gradient(to bottom, #ffffff, #ffffff);
    background-size: 100% 5px;
    background-repeat: no-repeat;
    background-position: center;
    font-size: 11px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
}


.custom-select-container {
    position: relative;
    width: 100%;
    font-family: "Poppins", sans-serif;
}

.custom-select {
    border: 1px solid #d3d3d3;
    border-radius: 15px;
    padding: 4px 15px 0px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    font-size: 14px;
    background-color: #fff;
    height: calc(3em + 10px);
    margin-bottom: 3px;
}

.custom-select:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.arrow {
    transition: transform 0.2s ease-in-out;
    font-size: 12px;
    color: #5b5b5b;
}

.arrow.rotated {
    transform: rotate(180deg);
}

.dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #d3d3d3;
    border-radius: 6px;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    margin-top: 4px;
}

.search-input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #d3d3d3;
    padding: 2px 12px;
    font-size: 14px;
    box-sizing: border-box;
    outline: none;
    margin-bottom: 0;
    border-radius: 15px 15px 0 0;
}

.dropdown-options {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 200px;
    overflow-y: auto;
}

.dropdown-option {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 12px;
    color: #333;
}

.dropdown-options::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.dropdown-options::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
}

.dropdown-options::-webkit-scrollbar-thumb:hover {
    background: #158a2f;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

.dropdown-options::-webkit-scrollbar-thumb:active {
    background-color: #158a2f;
}

.dropdown-option:hover {
    background-color: #f5f5f5;
}

.selected-option {
    margin-top: 5px;
    font-size: 14px;
    color: #333;
    padding-bottom: 10px;
}
</style>
